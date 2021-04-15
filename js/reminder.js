// Global variables
// ----------------------------------------------------------------------
var reminderInfoArray = [];
var expiredRemindersContainer = document.getElementById("expiredReminders");
var sideBar = document.querySelector("#sideBar");
var myLocalStorage = JSON.parse(localStorage.getItem("localEventInfo"));
var newReminderObj = {
  eventId:"",
  reminder:"",
  flag:""
}

// Calling functions
// ----------------------------------------------------------------------
triggerReminders();

// Functions
// ----------------------------------------------------------------------

// Sets the reminder properties for a given event
function setNewReminder(eventId, eventReminder){
  newReminderObj.eventId = eventId;
  newReminderObj.reminder = eventReminder;
  newReminderObj.flag = false;
  reminderInfoArray = JSON.parse(localStorage.getItem("localReminderInfo"));
  if (reminderInfoArray == null){
    reminderInfoArray = [];
  }
  reminderInfoArray.push(newReminderObj);
  localStorage.setItem("localReminderInfo", JSON.stringify(reminderInfoArray));
}

// Triggers setAllreminders once and then establishes a 
// establishes a setinterval to execute it again
function triggerReminders(){
  setAllReminders()
  setInterval(setAllReminders, 10000);
}

// Sets all reminders for the current events
function setAllReminders(){

  // Getting localEventInfo and localReminderInfo
  let myEventsInfo = JSON.parse(localStorage.getItem("localEventInfo"));
  reminderInfoArray = JSON.parse(localStorage.getItem("localReminderInfo"));

  // If reminderInfoArray is not empty we check every event
  // and if it has a reminder we add an expiration timeout to it
  if (reminderInfoArray !== null){
    reminderInfoArray.forEach(reminderElement => {
      myEventsInfo.forEach(eventElement => {
        if (eventElement.id == reminderElement.eventId && reminderElement.flag === false) {
          console.log("Seteo este reminder", reminderElement)
          
          // Calculating remaining time left before 
          // event expires and capturing event title
          let currentDate = new Date().getTime();
          let reminderEndDate = eventElement.endDate.milliseconds - (parseInt(reminderElement.reminder)*60000);
          let differenceMilliseconds = (reminderEndDate - currentDate);
          console.log("differenceMilliseconds -->", differenceMilliseconds/60000);
          let reminderTitle = eventElement.title;
          if (differenceMilliseconds > 0) {
            ("time out for reminderElement -->", reminderElement);
            
            // Setting the timeout for the given event and setting flag to true
            setTimeout(reminderTimeOut(reminderElement.eventId, reminderTitle, 
            eventElement.eventType, reminderElement.reminder, reminderInfoArray ), 
            differenceMilliseconds);
            reminderElement.flag = true;
          }
        }
      }) 
    });
  }else{
    reminderInfoArray = [];
  }
  
}

function reminderTimeOut(reminderId, reminderTitle, eventType, reminderValue, eventReminderInfo){
  
  // Creating and formating new reminder div to add it to the reminder conatiner
  let expiredReminderDiv = "<div id = reminder" +  reminderId + " class = reminder";
  //expiredReminderDiv.className = "reminder";
  switch (eventType) {
    case 0:
      expiredReminderDiv += " workReminder>"
      break;
    
    case 1:
      expiredReminderDiv += " sportReminder>";
      break;

    case 2:
      expiredReminderDiv += " musicReminder>";
      break;

    case 3:
      expiredReminderDiv += " otherReminder>";
      break;

    default:
      expiredReminderDiv += " defaultRemind>";
      break;
  }
  //expiredRemindersContainer.appendChild(expiredReminderDiv);
  expiredReminderDiv += reminderTitle + " expires in " + reminderValue + " minutes</div>";
  expiredRemindersContainer.insertAdjacentHTML('beforeend', expiredReminderDiv);

  //setting a timeout to remove the reminder div after its appearance
  setTimeout(function(expiredReminderDiv){
    expiredReminder = document.getElementById("reminder" + reminderId);
    console.log(expiredReminder)
    expiredRemindersContainer.removeChild(expiredReminder);
  }, 10000);

  // Removing the reminder from the reminderInfo array
  for (let e = 0; e < eventReminderInfo.length; e++) {
    if(eventReminderInfo[e].eventId === reminderId){
      eventReminderInfo.splice(e, 1);
    }
  }

  // Updating localReminderInfo in local storage
  localStorage.setItem("localReminderInfo",JSON.stringify(eventReminderInfo));

}




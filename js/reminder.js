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
  setInterval(setAllReminders, 1);
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
          
          // Calculating remaining time left before 
          // event expires and capturing event title
          let currentDate = new Date().getTime();
          let reminderEndDate = parseInt(eventElement.endDate.milliseconds) - (parseInt(reminderElement.reminder)*60000);



          //Just info for dates visualization
          let currentDateFormat = new Date(currentDate);
          let endDateFormat = new Date(eventElement.endDate.milliseconds);
          let reminderDateFormat = new Date (eventElement.endDate.milliseconds - (parseInt(reminderElement.reminder)*60000));
          console.log("Current date",currentDateFormat);
          console.log("End date",endDateFormat);
          // console.log("Hay que restarle a enddate", parseInt(reminderElement.reminder));
          console.log("End date - reminder", reminderDateFormat);



          let differenceMilliseconds = (reminderEndDate - currentDate);
          console.log("differenceMilliseconds en minutos -->", differenceMilliseconds/60000);
          let reminderTitle = eventElement.title;
          if (differenceMilliseconds > 0) {
            reminderElement.flag = true;
            // Setting the timeout for the given event and setting flag to true
            setTimeout(reminderTimeOut(reminderElement.eventId, reminderTitle, 
            eventElement.eventType, reminderElement.reminder, reminderInfoArray ), 
            differenceMilliseconds);
          }
        }
      }) 
    });
    // localStorage.setItem("localReminderInfo", JSON.stringify(reminderInfoArray));
  }else{
    reminderInfoArray = [];
  }
  
}

function reminderTimeOut(reminderId, reminderTitle, eventType, reminderValue, eventReminderInfo){
  // Creating and formating new reminder div to add it to the reminder conatiner
  let expiredReminderDiv = "<div id = reminder" +  reminderId + "wrapper>";
  let eventClassType;
  let reminderSpanClass;
  //expiredReminderDiv.className = "reminder";
  switch (eventType) {
    case 0:
      reminderSpanClass = "workSpan";
      reminderClassType = "workReminder>";
      expiredReminderDiv += "<span class = " + reminderSpanClass + "></span>" + "<div id = reminder" +  reminderId + " class = " + reminderClassType;
      break;
    
    case 1:
      reminderSpanClass = "sportSpan"
      reminderClassType = "sportReminder>";
      expiredReminderDiv += "<span class = " + reminderSpanClass + "></span>" + "<div id = reminder" +  reminderId + " class = " + reminderClassType;
      break;

    case 2:
      reminderSpanClass = "musicSpan";
      reminderClassType = "musicReminder>";
      expiredReminderDiv += "<span class = " + reminderSpanClass + "></span>" + "<div id = reminder" +  reminderId + " class = " + reminderClassType;
      break;

    case 3:
      reminderSpanClass = "otherSpan";
      reminderClassType = "otherReminder>";
      expiredReminderDiv += "<span class = " + reminderSpanClass + "></span>" + "<div id = reminder" +  reminderId + " class = " + reminderClassType;
      break;

    default:
      reminderSpanClass = "defaultSpan"
      reminderClassType = "defaultRemind>";
      expiredReminderDiv += "<span class = " + reminderSpanClass + "></span>" + "<div id = reminder" +  reminderId + " class = " + reminderClassType;
      break;
  }

  // Finishing html string and injecting it
  expiredReminderDiv += reminderTitle + " expires in " + reminderValue + " minutes</div> </div>";
  // console.log("type of expiredReminderDiv -->", typeof(expiredReminderDiv));
  expiredRemindersContainer.insertAdjacentHTML('beforeend', expiredReminderDiv);

  //setting a timeout to remove the reminder div after its appearance
  setTimeout(function(expiredReminderDiv){
    expiredReminder = document.getElementById("reminder" + reminderId + "wrapper");
    console.log(expiredReminder)
    expiredRemindersContainer.removeChild(expiredReminder);
    if(expiredRemindersContainer.children.length === 0){
      console.log("Im gonna hide reminderContainer");
      document.getElementById("reminderContainer").style.visibility = "hidden";
    }
  }, 20000);

  // Removing the reminder from the reminderInfo array
  for (let e = 0; e < eventReminderInfo.length; e++) {
    if(eventReminderInfo[e].eventId === reminderId){
      eventReminderInfo.splice(e, 1);
    }
  }

  // Updating localReminderInfo in local storage
  localStorage.setItem("localReminderInfo",JSON.stringify(eventReminderInfo));

}




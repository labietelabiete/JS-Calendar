if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  console.info( "This page is reloaded" );
} else {
  console.info( "This page is not reloaded");
}

// Global variables
// ----------------------------------------------------------------------
var reminderInfoArray = [];
var expiredRemindersContainer = document.getElementById("expiredReminders");

// Calling functions
setAllReminders();

var sideBar = document.querySelector("#sideBar");
var myLocalStorage = JSON.parse(localStorage.getItem("localEventInfo"));
var newReminderObj = {
  eventId:"",
  reminder:""
}


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


// Triggers setAllreminders
function triggerReminders(){

  setInterval(setAllReminders, interval);
}
function setAllReminders(){

  // Getting localEventInfo and localReminderInfo
  let myEventsInfo = JSON.parse(localStorage.getItem("localEventInfo"));
  reminderInfoArray = JSON.parse(localStorage.getItem("localReminderInfo"));

  // If reminderInfoArray is not empty we check every event
  // and if it has a reminder we add an expiration timeout to it
  if (reminderInfoArray !== null){
    reminderInfoArray.forEach(reminderElement => {
      myEventsInfo.forEach(eventElement => {
        if (eventElement.id == reminderElement.eventId ) {
          console.log("Seteo este reminder", reminderElement)
          let currentDate = new Date().getTime();
          let reminderEndDate = eventElement.endDate.milliseconds - (parseInt(reminderElement.reminder)*60000);
          let differenceMilliseconds = (reminderEndDate - currentDate);
          let reminderTitle = eventElement.title;
          if (differenceMilliseconds > 0) {
            ("time out for reminderElement -->", reminderElement);
            setTimeout(reminderTimeOut(reminderElement.eventId, reminderTitle, 
            eventElement.eventType, reminderElement.reminder, reminderInfoArray ), 
            differenceMilliseconds);
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
  let expiredReminderDiv = document.createElement("div");
  expiredReminderDiv.className = "reminder";
  switch (eventType) {
    case 0:
      expiredReminderDiv.classList.add('workReminder');
      break;
    
    case 1:
      expiredReminderDiv.classList.add('sportReminder');
      break;

    case 2:
      expiredReminderDiv.classList.add('musicReminder');
      break;

    case 3:
      expiredReminderDiv.classList.add('otherReminder');
      break;

    default:
      expiredReminderDiv.classList.add('defaultReminder');
      break;
  }
  expiredRemindersContainer.appendChild(expiredReminderDiv);
  expiredReminderDiv.textContent = reminderTitle + " expires in " + reminderValue + " minutes";
  console.log("type of expiredReminderDiv -->", typeof(expiredReminderDiv));
  //setting a timeout to remove the reminder div after its appearance
  setTimeout(function(expiredReminderDiv){
    expiredRemindersContainer.removeChild(expiredReminderDiv);
  }, 5000);

  // Removing the reminder from the reminderInfo array
  for (let e = 0; e < eventReminderInfo.length; e++) {
    if(eventReminderInfo[e].eventId === reminderId){
      eventReminderInfo.splice(e, 1);
    }
  }

  // Updating localReminderInfo in local storage
  localStorage.setItem("localReminderInfo",JSON.stringify(eventReminderInfo));

}







// const test = () => {
//     var newDiv = document.createElement("div");
//     var newUl = document.createElement("ul")
   
//     var newList = document.createElement("li")  
    
//     myLocalStorage.forEach(eachEvent => {
        
//       if (eachEvent.reminder) {
//         let eachEndDate = eachEvent.endDate;
//         let formattedEndDate = new Date(
//           eachEndDate.year,
//           eachEndDate.month - 1,
//           eachEndDate.day,
//           eachEndDate.hour,
//           eachEndDate.minutes,
//           eachEndDate.minutes
//         );
//         let reminderToMS = eachEvent.reminder * 60000;
//         let reminderTime = new Date(formattedEndDate - reminderToMS)
//           .toLocaleString()
//           .replace(/(.*)\D\d+/, "$1");
//         let currentTime = new Date()
//           .toLocaleString()
//           .replace(/(.*)\D\d+/, "$1");
//         let endDateTime = formattedEndDate
//           .toLocaleString()
//           .replace(/(.*)\D\d+/, "$1");
//          console.log(eachEvent.title)
//          console.log(formattedEndDate < new Date())
//          console.log(myLocalStorage)
//         //  setInterval(() => {
//  if (formattedEndDate > new Date()) {
//           console.log("reminder time", reminderTime);
//           console.log("current time", currentTime);
//           console.log(endDateTime <= currentTime);
//           if (reminderTime === currentTime) {
//             newDiv.innerText = `${eachEvent.title} will expire at ${endDateTime}`;
//             sideBar.prepend(newDiv);
//           }
//         } else if (formattedEndDate <= new Date()) {
//             document.getElementById("warningBox").remove()
//             newUl.setAttribute("id", "warningBox");
//             sideBar.prepend(newUl);
//           document.getElementById("warningBox").innerHTML += `<li>${eachEvent.title} has expired.</li>`;
//          // clearInterval(reminderInterval);
            
//         }
//         //  }, 10000)
       
//       }
//     });
  

// };

// test();


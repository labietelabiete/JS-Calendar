let modalNewEvent = document.getElementById("newEventModal");
let modalCheckEvent = document.getElementById("checkEventModal");

// Get the button that opens the modal
let btnNewEvent = document.getElementById("newEventBtn");
let btnCheckEvent = document.getElementById("checkEventBtn");


// Get the <span> element that closes the modal
let closeModal = document.getElementsByClassName("close");

let cancelNewEvent = document.getElementById("cancelNewEvent");
let removeEvent = document.getElementById("RemoveEventButton");
let okEvent = document.getElementById("okCheckEventButton"); 

// Get checkboxes and optional elements  
let endCheckbox = document.getElementById("checkBoxEndDate");
let showEndDate = document.getElementById("endNewEvent");
let endDateLabel = document.getElementById("endDateLabel");

let reminderCheckbox = document.getElementById("reminderNewEvent");
let showReminder = document.getElementById("reminderNewEventDiv");
let reminderLabel = document.getElementById("reminderLabel");

// Get save button to submit event and save it to calendar and localStorage
let saveEventButton = document.getElementById("saveNewEvent");

// Get new event form 
let newEventForm = document.getElementById("newEventForm");


// When the user clicks the button, open the modal 
btnNewEvent.onclick = function() {
  modalNewEvent.style.display = "block";
}
btnCheckEvent.onclick = function() {
  modalCheckEvent.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
closeModal[0].onclick = function() {
  modalNewEvent.style.display = "none";
}
closeModal[1].onclick = function() {
  modalCheckEvent.style.display = "none";
}

// When the user clicks on cancel, close the modal
cancelNewEvent.onclick = function() {
  modalNewEvent.style.display = "none";
}

// When the user clicks on OK, close the modal
okEvent.onclick = function() {
  modalCheckEvent.style.display = "none";
}

//When the user click on remove event
removeEvent.onclick = function() {
  modalCheckEvent.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalCheckEvent || event.target == modalNewEvent) {
    modalNewEvent.style.display = "none";
    modalCheckEvent.style.display = "none";
  }
}


document.onkeydown = function(event) {
  event = event || window.event;
  if (event.keyCode == 27) {
    modalNewEvent.style.display = "none";
    modalCheckEvent.style.display = "none";
  }
};


// Display options when the checkbox is checked
endCheckbox.onclick = function() {
  if(endCheckbox.checked == true) {
    showEndDate.style.display = "inline-block";
    endDateLabel.style.color = "var(--blackColor)";
    endDateLabel.style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";
  } else {
    showEndDate.style.display = "none";
    endDateLabel.style.color = "var(--greyColor)";
    endDateLabel.style.borderBottom  = "var(--greyColor) solid var(--borderWidth)";
  }
}

reminderCheckbox.onclick = function() {
  if(reminderCheckbox.checked == true) {
    showReminder.style.display = "inline-block";
    reminderLabel.style.color = "var(--blackColor)";
    reminderLabel.style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";
  } else {
    showReminder.style.display = "none";
    reminderLabel.style.color = "var(--greyColor)";
    reminderLabel.style.borderBottom  = "var(--greyColor) solid var(--borderWidth)";
  }
}


// Save events to localStorage when create button is clicked
// 1. Check validity 
// 2. if it is true, set the event localStorage
//    else show pop up message 
newEventForm.onchange = function() {
//title value 
if(newEventForm.checkValidity()) {

}

var titleCheck = /^.{1,60}$/
var title = newEventForm["titleNewEvent"].value

var OK = titleCheck.exec(newEventForm["titleNewEvent"].value)
console.log(OK ? true : false)


console.log(endCheckbox.checked ? true : false)
console.log(reminderCheckbox.checked ? true : false)
console.log(document.getElementById("typeNewEvent").value === "none")
}


//Event information handling

//Variables definition
let r = document.querySelector(':root');

titleNewEvent = document.getElementById('titleNewEvent');
typeNewEvent = document.getElementById('typeNewEvent');
startNewEvent = document.getElementById('startNewEvent');
endNewEvent = document.getElementById('endNewEvent');
timeReminderNewEvent = document.getElementById('timeReminderNewEvent');
descriptionNewEvent = document.getElementById('descriptionNewEvent');

titleEvent = document.getElementById('titleEvent');
typeEvent = document.getElementById('typeEvent');
startDateEvent = document.getElementById('startDateEvent');
endDateEvent = document.getElementById('endDateEvent');
reminderEvent = document.getElementById('reminderEvent');
descriptionEvent = document.getElementById('descriptionEvent');

eventEndDateLabel = document.getElementById('eventEndDateLabel');
eventReminderLabel = document.getElementById('eventReminderLabel')

let i = 0;
let eventInfoArray = [];
let newEventObj = {};

let eventIndex = i;

localStorage.setItem("eventIndex", eventIndex );


// Function to save a new event
saveEventButton.addEventListener('click', function(){
  setNewEvent();
  getEvent();
  modalNewEvent.style.display = "none";
  // clearNewEventForm();
})

// Functino for setting new event information to local storage
function setNewEvent(){
  newEventObj = {
    title: titleNewEvent.value,
    type: typeNewEvent.value,
    startDate: startNewEvent.value,
    endDate: endNewEvent.value,
    reminder: timeReminderNewEvent.value,
    description: descriptionNewEvent.value,
  };

  eventInfoArray.push(newEventObj);

  //Stringiying our object generated by event form
  localStorage.setItem("localEventInfo", JSON.stringify(eventInfoArray));

}

//Function for getting event from local storage for visualization
function getEvent(){
  //Parseing event info from local storage
  let eventInfoJS = JSON.parse(localStorage.getItem("localEventInfo"));

  titleEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].title;
  //Depending of type event, the colour of the event is differente
  switch (eventInfoJS[localStorage.getItem("eventIndex")].type) {
    case "Work":
      r.style.setProperty('--eventColor', 'rgb(210, 43, 65)');
      break;
    case "Sport":
      r.style.setProperty('--eventColor', 'rgb(220, 0, 235)');
      break;
    case "Music":
      r.style.setProperty('--eventColor', 'rgb(0, 213, 194)');
      break;
    case "Other":
      r.style.setProperty('--eventColor', 'rgb(0, 89, 194)');
      break;
    default:
      r.style.setProperty('--eventColor', 'black');
      break;
  }
  typeEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].type;
  startDateEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].startDate;

  //Enddate as optional argument
  if (eventInfoJS[localStorage.getItem("eventIndex")].endDate == "") {
    eventEndDateLabel.style.display = "none";
  } else{
    console.log("Entro a display eventEndDateLabel");
    eventEndDateLabel.style.display = "inline-block";
    endDateEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].endDate;
  }
  //Enddate as optional argument
  if (eventInfoJS[localStorage.getItem("eventIndex")].reminder == "") {
    eventReminderLabel.style.display = "none";
  } 
    else{
    console.log("Entro a display eventReminderLabel");
    eventReminderLabel.style.display = "inline-block";
    reminderEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].reminder;
  }
  
  descriptionEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].description;

  i++;
  eventIndex = i;
  localStorage.setItem("eventIndex", eventIndex);
}

function clearNewEventForm(){
  titleNewEvent.value = "";
  typeNewEvent.value = "";
  startNewEvent.value = "";
  endNewEvent.value = "";
  timeReminderNewEvent.value = "";
  descriptionNewEvent.value = "";
}

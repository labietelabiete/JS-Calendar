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

let reminderCheckbox = document.getElementById("reminderNewEvent");
let showReminder = document.getElementById("reminderNewEventDiv");

// Get save button to submit event and save it to calendar and localStorage
let saveEventButton = document.getElementById("saveNewEvent");

// Get form and type
let newEventForm = document.getElementById("newEventForm");
let eventType = document.getElementById("typeNewEvent");
let startEvent = document.getElementById("startNewEvent");
let eventDescription = document.getElementById("descriptionNewEvent");

// When the user clicks the button, open the modal
btnNewEvent.onclick = function () {
  modalNewEvent.style.display = "block";
};
btnCheckEvent.onclick = function () {
  modalCheckEvent.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeModal[0].onclick = function () {
  modalNewEvent.style.display = "none";
};
closeModal[1].onclick = function () {
  modalCheckEvent.style.display = "none";
};

// When the user clicks on cancel, close the modal
cancelNewEvent.onclick = function () {
  modalNewEvent.style.display = "none";
};

// When the user clicks on OK, close the modal
okEvent.onclick = function () {
  modalCheckEvent.style.display = "none";
};

//When the user click on remove event
removeEvent.onclick = function () {
  modalCheckEvent.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalCheckEvent || event.target == modalNewEvent) {
    modalNewEvent.style.display = "none";
    modalCheckEvent.style.display = "none";
  }
};

document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode == 27) {
    modalNewEvent.style.display = "none";
    modalCheckEvent.style.display = "none";
  }
};

// Display options when the checkbox is checked
endCheckbox.onclick = function () {
  if (endCheckbox.checked == true) {
    showEndDate.style.display = "inline-block";
  } else {
    showEndDate.style.display = "none";
  }
};

reminderCheckbox.onclick = function () {
  if (reminderCheckbox.checked == true) {
    showReminder.style.display = "inline-block";
  } else {
    showReminder.style.display = "none";
  }
};

// Save events to localStorage when create button is clicked
// 1. Check validity
// 2. if it is true, set the event localStorage
//    else show pop up message
newEventForm.onsubmit = function () {
  var titleCheck = /^.{1,60}$/; // we need to discuss 
  var title = newEventForm["titleNewEvent"].value;
  var myArray = []; // using array to all the data to localStorage 

  if (title.search(titleCheck) === -1) return false;
  myArray.push({title : title});

  if (eventType.value === "none") return false;
  myArray[0]["eventType"] = eventType.value;

  if (endCheckbox.checked) {
    newEventForm["endNewEvent"].required = true;
    if (!newEventForm["endNewEvent"].value) return false;
    myArray[0]["endDate"] = newEventForm["endNewEvent"].value
  }

  if (reminderCheckbox.checked) {
    newEventForm["timeReminderNewEvent"].required = true;
    if (!newEventForm["timeReminderNewEvent"].value) return false;
     myArray[0]["reminder"] = newEventForm["timeReminderNewEvent"].value
  }

  if(eventDescription.value) {
    myArray[0]["description"] = eventDescription.value;
  }
  // we have to decide which format has to be used here. 
  // following format is matched with string format like new Date()
  var startEventValue = new Date(startEvent.value).toString()
  localStorage.setItem(JSON.stringify(startEventValue), JSON.stringify(myArray))
  return true;
};

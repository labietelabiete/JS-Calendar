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

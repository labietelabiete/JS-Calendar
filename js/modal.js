let r = document.querySelector(':root');
//Event information handling
//Variables definition
let dateEventUTC;
let i = 0;
let eventInfoArray;
let newEventObj = {};
let testEventIndex = i;

let eventIndex;
let iniEvent = JSON.parse(localStorage.getItem("localEventInfo"));
if (iniEvent == null){
  eventIndex = 0;
  eventInfoArray = [];
}else{
  eventIndex = iniEvent.length;
  eventInfoArray = JSON.parse(localStorage.getItem("localEventInfo"));
}
localStorage.setItem("eventIndex", eventIndex );


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
eventReminderLabel = document.getElementById('eventReminderLabel');
eventDescriptionLabel = document.querySelector(".eventDescriptionLabel")


modalNewEvent = document.getElementById("newEventModal");
modalCheckEvent = document.getElementById("checkEventModal");

// Get the button that opens the modal
btnNewEvent = document.getElementById("newEventBtn");
btnCheckEvent = document.getElementById("checkEventBtn");

// Get the <span> element that closes the modal
closeModal = document.getElementsByClassName("close");

cancelNewEvent = document.getElementById("cancelNewEvent");
removeEvent = document.getElementById("RemoveEventButton");
okEvent = document.getElementById("okCheckEventButton");

// Get checkboxes and optional elements
eventLabel = document.querySelectorAll(".eventLabel")

endCheckbox = document.getElementById("checkBoxEndDate");
endDateLabel = document.getElementById("endDateLabel");

reminderCheckbox = document.getElementById("reminderNewEvent");
showReminder = document.getElementById("reminderNewEventDiv");
reminderLabel = document.getElementById("reminderLabel");

// Get save button to submit event and save it to calendar and localStorage
saveEventButton = document.getElementById("saveNewEvent");

// Get form and type
newEventForm = document.getElementById("newEventForm");
eventDescription = document.getElementById("descriptionNewEvent");

checkboxNewEvent = document.querySelectorAll(".spanEvent")





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
  clearNewEventForm();
};
closeModal[1].onclick = function () {
  modalCheckEvent.style.display = "none";
};

// When the user clicks on cancel, close the modal
cancelNewEvent.onclick = function () {
  modalNewEvent.style.display = "none";
  clearNewEventForm();
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
    clearNewEventForm();
  }
};

document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode == 27) {
    modalNewEvent.style.display = "none";
    modalCheckEvent.style.display = "none";
    clearNewEventForm();
  }
};

// Display options when the checkbox is checked
endCheckbox.onclick = function () {
  if (endCheckbox.checked == true) {
    endNewEvent.style.display = "inline-block";
    endDateLabel.style.color = "var(--blackColor)";
    endDateLabel.style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";
  } else {
    endNewEvent.style.display = "none";
    endDateLabel.style.color = "var(--greyColor)";
    endDateLabel.style.borderBottom  = "var(--greyColor) solid var(--borderWidth)";
  }
};

reminderCheckbox.onclick = function () {
  if (reminderCheckbox.checked == true) {
    showReminder.style.display = "inline-block";
    reminderLabel.style.color = "var(--blackColor)";
    reminderLabel.style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";
  } else {
    showReminder.style.display = "none";
    reminderLabel.style.color = "var(--greyColor)";
    reminderLabel.style.borderBottom  = "var(--greyColor) solid var(--borderWidth)";
  }
};
// Save events to localStorage when create button is clicked
// 1. Check validity
// 2. if it is true, set the event localStorage
//    else show pop up message
function newEventValidation () {
  var titleCheck = /^.{1,60}$/; // we need to discuss 
  var title = titleNewEvent.value;

  if (title.search(titleCheck) === -1) {
    titleNewEvent.style.background = "rgb(210, 43, 65, 0.4)"
    return false;
  }

  if (typeNewEvent.value === "none") {
   typeNewEvent.style.color = "var(--redColor)"
    return false;
  }

  if(!startNewEvent.value) {
    eventLabel[0].style.color = "var(--redColor)"
    eventLabel[0].style.borderBottom  = "var(--redColor) solid var(--borderWidth)";

    return false;
  }
  if (endCheckbox.checked) {
    endNewEvent.required = true;
    if (!endNewEvent.value) {
      endDateLabel.style.color = "var(--redColor)";
      endDateLabel.style.borderBottom  = "var(--redColor) solid var(--borderWidth)";
      checkboxNewEvent[0].style.background = "url('../assets/img/checkedbox_red.png')"
      if (window.innerWidth < 768) {
        checkboxNewEvent[0].style.backgroundSize = "10px 10px";
      }
      return false;
    }
  }

  if (reminderCheckbox.checked) {
    timeReminderNewEvent.required = true;
    if (timeReminderNewEvent.value === "") {
      reminderLabel.style.color = "var(--redColor)";
      reminderLabel.style.borderBottom  = "var(--redColor) solid var(--borderWidth)";
      checkboxNewEvent[1].style.background = "url('../assets/img/checkedbox_red.png')"
      if (window.innerWidth < 768) {
        checkboxNewEvent[1].style.backgroundSize = "10px 10px";
      }
      return false;
    }
  }

  if(!descriptionNewEvent.value) {
    eventDescriptionLabel.style.color = "var(--redColor)"
    eventLabel[3].style.borderBottom  = "var(--redColor) solid var(--borderWidth)";

    return false;
  }

  return true;
};



// Function to save a new event
saveEventButton.addEventListener('click', function(){
  if(newEventValidation()){
  setNewEvent();
  // getEvent();
  clearNewEventForm();
  modalNewEvent.style.display = "none";
  }
 
})

// Function for setting new event information to local storage
function setNewEvent(){
  dateStartEventUTC = new Date(startNewEvent.value)
  dateEndEventUTC = new Date(startNewEvent.value)

  newEventObj = {
    id: eventIndex,
    title: titleNewEvent.value,
    type: typeNewEvent.value,
    startDate: {
      milliseconds : dateStartEventUTC.getTime(),
      minutes : dateStartEventUTC.getUTCMinutes(),
      hour :  dateStartEventUTC.getUTCHours()+2,
      day : dateStartEventUTC.getUTCDate(),
      month : dateStartEventUTC.getUTCMonth()+1,
      year : dateStartEventUTC.getUTCFullYear(),
    },
    endDate: {
      milliseconds : dateEndEventUTC.getTime(),
      minutes : dateEndEventUTC.getUTCMinutes(),
      hour :  dateEndEventUTC.getUTCHours()+2,
      day : dateEndEventUTC.getUTCDate(),
      month : dateEndEventUTC.getUTCMonth()+1,
      year : dateEndEventUTC.getUTCFullYear(),
    },
    reminder: timeReminderNewEvent.value,
    description: descriptionNewEvent.value,
  };
  if(newEventObj.endDate == "Invalid Date") {
    newEventObj.endDate = ""
  }
  eventInfoArray.push(newEventObj);


  //Stringiying our object generated by event form
  localStorage.setItem("localEventInfo", JSON.stringify(eventInfoArray));
  //Updating eventIndex
  localStorage.setItem("eventIndex", JSON.parse(localStorage.getItem("localEventInfo")).length);
  eventIndex = JSON.parse(localStorage.getItem("localEventInfo")).length;
}

let day40 = document.querySelector('#eventId0');
day40.addEventListener('click', getEvent);
//Function for getting event from local storage for visualization
function getEvent(){
  idEvent = this.id;
  idEvent = idEvent.match(/\d/g);
  idEvent = idEvent.join("");
  console.log(idEvent);

  eventListComparing = JSON.parse(localStorage.getItem("localEventInfo"));
  eventListComparing.forEach(function(eventComparing){
    if (eventComparing.id == idEvent){
      console.log("la tengo");
      console.log(eventComparing.id);
      eventToDisplay = eventComparing;
      console.log(eventToDisplay);
    }
    } )

    titleEvent.innerHTML = eventToDisplay.title;
  // //Depending of type event, the colour of the event is differente
    switch (parseInt(eventToDisplay.type)) {
      case 0:
        r.style.setProperty('--eventColor', 'rgb(210, 43, 65)');
        typeEvent.innerHTML = "Work";
        break;
      case 1:
        r.style.setProperty('--eventColor', 'rgb(220, 0, 235)');
        typeEvent.innerHTML = "Music";
        break;
      case 2:
        r.style.setProperty('--eventColor', 'rgb(0, 213, 194)');
        typeEvent.innerHTML = "Sport";
        break;
      case 3:
        r.style.setProperty('--eventColor', 'rgb(0, 89, 194)');
        typeEvent.innerHTML = "Other";
        break;
      default:
        r.style.setProperty('--eventColor', 'black');
        break;
    }

    startDateEvent.innerHTML = eventToDisplay.startDate.day + "/" + eventToDisplay.startDate.month + "/" + eventToDisplay.startDate.year + " " + eventToDisplay.startDate.hour + ":" + eventToDisplay.startDate.minutes;

    if (eventToDisplay.endDate == "") {
      eventEndDateLabel.style.display = "none";
    } else{
      eventEndDateLabel.style.display = "inline-block";
      endDateEvent.innerHTML = eventToDisplay.endDate.day + "/" + eventToDisplay.endDate.month + "/" + eventToDisplay.endDate.year + " " + eventToDisplay.endDate.hour + ":" + eventToDisplay.endDate.minutes;
    }

    if (eventToDisplay.reminder == "") {
      eventReminderLabel.style.display = "none";
    } 
      else{
      console.log("Entro a display eventReminderLabel");
      eventReminderLabel.style.display = "inline-block";
      reminderEvent.innerHTML = eventToDisplay.reminder;
    }

    descriptionEvent.innerHTML = eventToDisplay.description;

    modalCheckEvent.style.display = "block";





  //Parseing event info from local storage
  // let eventInfoJS = JSON.parse(localStorage.getItem("localEventInfo"));

  // titleEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].title;
  // //Depending of type event, the colour of the event is differente
  // switch (eventInfoJS[localStorage.getItem("eventIndex")].type) {
  //   case 0:
  //     r.style.setProperty('--eventColor', 'rgb(210, 43, 65)');
  //     break;
  //   case 1:
  //     r.style.setProperty('--eventColor', 'rgb(220, 0, 235)');
  //     break;
  //   case 2:
  //     r.style.setProperty('--eventColor', 'rgb(0, 213, 194)');
  //     break;
  //   case 3:
  //     r.style.setProperty('--eventColor', 'rgb(0, 89, 194)');
  //     break;
  //   default:
  //     r.style.setProperty('--eventColor', 'black');
  //     break;
  // }
  // typeEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].type;
  // startDateEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].startDate;

  // //Enddate as optional argument
  // if (eventInfoJS[localStorage.getItem("eventIndex")].endDate == "") {
  //   eventEndDateLabel.style.display = "none";
  // } else{
  //   console.log("Entro a display eventEndDateLabel");
  //   eventEndDateLabel.style.display = "inline-block";
  //   endDateEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].endDate;
  // }
  // //Enddate as optional argument
  // if (eventInfoJS[localStorage.getItem("eventIndex")].reminder == "") {
  //   eventReminderLabel.style.display = "none";
  // } 
  //   else{
  //   console.log("Entro a display eventReminderLabel");
  //   eventReminderLabel.style.display = "inline-block";
  //   reminderEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].reminder;
  // }
  
  // descriptionEvent.innerHTML = eventInfoJS[localStorage.getItem("eventIndex")].description;

  // // localStorage.setItem("testEventIndex", eventIndex);
}

function clearNewEventForm(){
  newEventForm.reset();

  //Setting empty the formulary
  // titleNewEvent.value = "";
  // typeNewEvent.value = "";
  // typeNewEvent.innerHTML = "Type"
  // startNewEvent.value = "";
  // endNewEvent.value = "";
  // timeReminderNewEvent.value = "";
  // timeReminderNewEvent.innerHTML = "Select one"
  // descriptionNewEvent.value = "";
  

  //Setting black back all colors
  titleNewEvent.style.background = "white";
  typeNewEvent.style.color = "var(--darkColor)";
  eventLabel[0].style.color = "var(--darkColor)";
  eventLabel[0].style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";

  endDateLabel.style.color = "var(--blackColor)";
  endDateLabel.style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";
  checkboxNewEvent[0].style.background = "url('../assets/img/checkedbox_black.png')"

  reminderLabel.style.color = "var(--darkColor)";
  reminderLabel.style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";
  checkboxNewEvent[1].style.background = "url('../assets/img/checkedbox_black.png')";

  eventDescriptionLabel.style.color = "var(--darkColor)";
  eventLabel[3].style.borderBottom  = "var(--darkColor) solid var(--borderWidth)";
}

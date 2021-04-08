var modalNewEvent = document.getElementById("newEventModal");

// Get the button that opens the modal
var btnNewEevent = document.getElementById("newEventBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var cancel = document.getElementById("cancelNewEvent");



// When the user clicks the button, open the modal 
btnNewEevent.onclick = function() {
  modalNewEvent.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalNewEvent.style.display = "none";
}

cancel.onclick = function() {
  modalNewEvent.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalNewEvent) {
    modalNewEvent.style.display = "none";
  }
}

document.onkeydown = function(event) {
  event = event || window.event;
  if (event.keyCode == 27) {
    modalNewEvent.style.display = "none";
  }
};
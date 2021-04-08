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

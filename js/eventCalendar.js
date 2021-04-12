// GLOBAL VARIABLES
//------------------------------------------------------------------------
const date1 = new Date('April 23, 2021 14:00:30 GMT+11:00');
console.log("Day", date1.getUTCDate());
console.log("Year", date1.getUTCFullYear());
console.log("Month", date1.getUTCMonth()+1);
console.log("Hour", date1.getUTCHours()+2);


// FUNCTIONS
//------------------------------------------------------------------------
function addEvent(day, addedEvent){
    console.log("Text");
}


// Showing already created events (month overview)
function showingEvents(dayId, numEvents){
    let selDay = document.querySelector("#day12 .eventsDiv");
    for ( let d = 1; d<=numEvents; d++){
        let newEvent = document.createElement("div");
        selDay.appendChild(newEvent);
        newEvent.innerText = "Event" + d;
    }
}


// CALLING FUNCTIONS
//------------------------------------------------------------------------
addEvent(13, "Test");
showingEvents(3);
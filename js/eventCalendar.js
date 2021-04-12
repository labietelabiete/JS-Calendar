// GLOBAL VARIABLES
//------------------------------------------------------------------------
var date1 = new Date('April 23, 2021 14:00:30 GMT+11:00');
/*console.log("Day", date1.getUTCDate());
console.log("Year", date1.getUTCFullYear());
console.log("Month", date1.getUTCMonth()+1);
console.log("Hour", date1.getUTCHours()+2); */
var Test = document.getElementById("newEventBtn");
var eventObj = {
    title: new String,
    type: 0,
    description: new String,
    reminder: 0,
    hour: 0,
    day: 0,
    month: 0,
    year: 0,
    endDate: 'Invalid Date'
}

var events = [];

// LISTENERS
//------------------------------------------------------------------------
Test.addEventListener("click", addEvent);

// FUNCTIONS
//------------------------------------------------------------------------
function addEvent(){
    console.log("date1", date1);
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
//addEvent(13, "Test");
//showingEvents(3);
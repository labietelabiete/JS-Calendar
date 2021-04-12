// GLOBAL VARIABLES
//------------------------------------------------------------------------
// var Test = document.getElementById("newEventBtn");
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
var eventsArray = [];
var eventsDivs = document.querySelectorAll(".eventsDiv");
console.log(currentMonthDays);
// LISTENERS
//------------------------------------------------------------------------

// Showing already created events (month overview)
function showingEvents(dayId, numEvents){
    let selDay = document.querySelector("#day12 .eventsDiv");
    for ( let d = 1; d<=numEvents; d++){
        let newEvent = document.createElement("div");
        selDay.appendChild(newEvent);
        newEvent.innerText = "Event" + d;
    }
}

// Creating a filtered array (month events)
saveEventButton.addEventListener('click', setDailyEvents)
prevMonthBtn.addEventListener('click', setDailyEvents);
nextMonthBtn.addEventListener('click', setDailyEvents);

function resetDaysContent(array){
    for ( const day in array){
        day.innerHTML = "";
    }
}

// Current month's events
function getMonthEvents(obj){
    if(obj.startDate.year === currentYearNum && obj.startDate.month === currentMonthNum){
        return obj;
    } else {
        return false;
    }
}

function setDailyEvents(){
    // Restoring all previous HTML content
    resetDaysContent(eventsDivs);

    let monthEvents = JSON.parse(localStorage.getItem("localEventInfo")).filter(getMonthEvents);

    // Sorting all events by time
    monthEvents.sort(function(a, b){
        return a.startDate.milliseconds - b.startDate.milliseconds;
    });

    console.log("Month events", monthEvents);

    let lastEvent = monthEvents[monthEvents.length-1];
    let dayID = lastEvent.startDate.day;
    let dayEventsDiv = document.querySelector("#day" + dayID + " .eventsDiv");
    let newEventDiv = document.createElement("div");
    dayEventsDiv.appendChild(newEventDiv);
    newEventDiv.innerText = lastEvent.title;
}
// CALLING FUNCTIONS
//------------------------------------------------------------------------
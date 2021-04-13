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
// Creating a filtered array (month events)
saveEventButton.addEventListener('click', setDailyEvents);
setMonthEvents();
prevMonthBtn.addEventListener('click', setMonthEvents);
nextMonthBtn.addEventListener('click', setMonthEvents);


function resetDaysContent(array){
    for ( const d of array ){
        d.innerHTML = "";
    }
}

// Sort current month's events
function getMonthEvents(obj){
    if(obj.startDate.year === currentYearNum && obj.startDate.month === currentMonthNum){
        return obj;
    } else {
        return false;
    }
}

// Display current month's events
function setMonthEvents(){
    
    let allStorage = JSON.parse(localStorage.getItem("localEventInfo"))
    let monthEvents = allStorage.filter(getMonthEvents);
    // Sorting all events by time
    monthEvents.sort(function(a, b){
        return a.startDate.milliseconds - b.startDate.milliseconds;
    });

    monthEvents.forEach(function(monthEvent){
        let dayID = monthEvent.startDate.day;
        let dayEventsDiv = document.querySelector("#day" + dayID + " .eventsDiv");
        let newEventDiv = document.createElement("div");
        dayEventsDiv.appendChild(newEventDiv);
        newEventDiv.innerText = monthEvent.title;
    })
}

function setDailyEvents(){
    // Restoring all previous HTML content
    resetDaysContent(eventsDivs);

    let allStorage = JSON.parse(localStorage.getItem("localEventInfo"))
    let monthEvents = allStorage.filter(getMonthEvents);

    // Sorting all events by time
    let sortedMonthEvents = monthEvents.sort(function(a, b){
        return a.startDate.milliseconds - b.startDate.milliseconds;
    });

    console.log("Month events", sortedMonthEvents);

    // Appending the div
    let lastEvent = allStorage[allStorage.length-1];

    if (lastEvent.startDate.month === currentMonthNum){
        let dayID = lastEvent.startDate.day;
        let dayEventsDiv = document.querySelector("#day" + dayID + " .eventsDiv");
        let newEventDiv = document.createElement("div");
        newEventDiv.setAttribute("id", lastEvent.id);
        dayEventsDiv.appendChild(newEventDiv);
        newEventDiv.innerText = lastEvent.title;
    }

}
// CALLING FUNCTIONS
//------------------------------------------------------------------------
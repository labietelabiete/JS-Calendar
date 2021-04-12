// GLOBAL VARIABLES
//------------------------------------------------------------------------
/*var date1 = new Date('April 23, 2021 14:00:30 GMT+11:00');
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
*/
var events;
// LISTENERS
//------------------------------------------------------------------------
//Test.addEventListener("click", addEvent);

// FUNCTIONS
//------------------------------------------------------------------------

// Gathers all events in local sotrage and 
// stores them in the array eventInfoJS
function gatherEvents(){

    return JSON.parse(localStorage.getItem("localEventInfo"));

}

//  Adds new event div if required
function addEventDivs(selectedDay){
    
    dayEventsArray = [];
    let month = document.getElementById("month").innerText;
    let year = document.getElementById("year").innerText;

    // Get all events
    let currentEvents = gatherEvents();
    console.log("All current events: ",currentEvents)

    currentMonthDays = document.querySelectorAll(".currentMonthDay");
    console.log(currentMonthDays);
    // Capturing selected day event div
    let selectedDayEventDiv = document.querySelectorAll(".currentMonthDay").item(selectedDay-1).childNodes[1];

    // mockEvent for testing adding event divs if
    let mockEventDiv = document.createElement("div");
    mockEventDiv.innerText = "hello there"
    selectedDayEventDiv.appendChild(mockEventDiv);

    // Storing all selectedDay events
    for(let i=0; i<currentEvents.length; i++){

        if(currentEvents[i].day === selectedDay && currentEvents[i].month === month && currentEvents[i].year === year){
            events.push(currentEvents[i]);
        }

    }

    // Adding and styling event divs into event div
    for(let e=0; e<events.length; e++){
        
        let type = events[e].type;
        let title = events[e].title;
        let typeClass = new String;

        
        // Adding new event div in event div
        if(selectedDayEventDiv.childNodes.length === 0){
            selectedDayEventDiv.insertAdjacentHTML('afterbegin', `<div class ='${typeClass}'> ${title} </div>`);
        }else{
            selectedDayEventDiv.insertAdjacentHTML('beforeend', `<div class ='${typeClass}'> ${title} </div>`);
        }

    }

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
addEventDivs(1);
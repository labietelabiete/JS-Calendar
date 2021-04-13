// GLOBAL VARIABLES
//------------------------------------------------------------------------
var eventsDivs = document.querySelectorAll(".eventsDiv");
// Accessing all checkboxes
let workCheckbox = document.getElementById("workCheckbox");
let sportCheckbox = document.getElementById("sportCheckbox");
let musicCheckbox = document.getElementById("musicCheckbox");
let otherCheckbox = document.getElementById("otherCheckbox");



// LISTENERS
//------------------------------------------------------------------------
setMonthEvents();
saveEventButton.addEventListener('click', setDailyEvents);
prevMonthBtn.addEventListener('click', setMonthEvents);
nextMonthBtn.addEventListener('click', setMonthEvents);

// workCheckbox.addEventListener("change", setMonthEvents);
// sportCheckbox.addEventListener("change", setMonthEvents);
// musicCheckbox.addEventListener("change", setMonthEvents);
// otherCheckbox.addEventListener("change", setMonthEvents);

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

// Filter type of events
function filterType(array){
    let filteredArray = new Array;


    return filteredArray;
}

// Display current month's events
function setMonthEvents(){


    let allStorage = JSON.parse(localStorage.getItem("localEventInfo"));

    // Only declaring month events if at least there's one event
    if (allStorage !== null){
        // Sorting by month & year
        let monthEvents = allStorage.filter(getMonthEvents);
        // Sorting by time
        monthEvents.sort(function(a, b){
            return a.startDate.milliseconds - b.startDate.milliseconds;
        });



        monthEvents.forEach(function(monthEvent){
            let dayID = monthEvent.startDate.day;
            let dayEventsDiv = document.querySelector("#day" + dayID + " .eventsDiv");
            let newEventDiv = document.createElement("div");
            dayEventsDiv.appendChild(newEventDiv);

            newEventDiv.setAttribute("class", "event");
            newEventDiv.setAttribute("id", "eventId"+monthEvent.id);
            newEventDiv.classList.add(typeOfEvents[monthEvent.type]+"Event");
            newEventDiv.innerText = monthEvent.title;
        })
    }
}

function setDailyEvents(){
    // Restoring all previous HTML content
    resetDaysContent(eventsDivs);
    setMonthEvents();
}


// CALLING FUNCTIONS
//------------------------------------------------------------------------
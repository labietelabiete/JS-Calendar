// GLOBAL VARIABLES
//------------------------------------------------------------------------
var eventsDivs = document.querySelectorAll(".eventsDiv");

// LISTENERS
//------------------------------------------------------------------------
setMonthEvents();
saveEventButton.addEventListener('click', setDailyEvents);
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


    let allStorage = JSON.parse(localStorage.getItem("localEventInfo"));

    // Only declaring month events if at least there's one event
    if (allStorage !== null){
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

            newEventDiv.setAttribute("class", "event");
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
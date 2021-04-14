// GLOBAL VARIABLES
//------------------------------------------------------------------------
let eventsDivs = document.querySelectorAll(".eventsDiv");
// Accessing all checkboxes
let workCheckbox = document.getElementById("workCheckbox");
let sportCheckbox = document.getElementById("sportCheckbox");
let musicCheckbox = document.getElementById("musicCheckbox");
let otherCheckbox = document.getElementById("otherCheckbox");
let allStorage = [];

// LISTENERS
//------------------------------------------------------------------------
saveEventButton.addEventListener('click', setDailyEvents);

// Cleaning the month we are heading to
prevMonthBtn.addEventListener('click', setMonthEvents);
nextMonthBtn.addEventListener('click', setMonthEvents);
// Cleaning the month we are heading to


workCheckbox.addEventListener("change", setDailyEvents);
sportCheckbox.addEventListener("change", setDailyEvents);
musicCheckbox.addEventListener("change", setDailyEvents);
otherCheckbox.addEventListener("change", setDailyEvents);



document.getElementById("month").addEventListener("click", function(){
    resetDaysContent(eventsDivs);
});

// Sort current month's events
function getMonthEvents(obj){
    if(obj.startDate.year === currentYearNum && obj.startDate.month === currentMonthNum){
        return obj;
    } else {
        return false;
    }
}

function removeAllChildNodes(parent) {
    let parentChilds = parent.childNodes;
    for (let i=0; i<parentChilds.length; i++) {
        parent.removeChild(parentChilds[i]);
    }
}


function resetDaysContent(){
    if(allStorage.length > 0){
        let monthEvents = allStorage.filter(getMonthEvents);
        //console.log("monthEvents -->", monthEvents);
        monthEvents.forEach(function(monthEvent){
            var previousEvent = document.getElementById("eventId"+monthEvent.id);
            if(previousEvent !== null){
                previousEvent.remove();
            }
            
        })
    }

}

// Filter type of events
function filterType(array){
    //resetDaysContent(eventsDivs);

    let filteredArray = new Array;
    array.forEach(function(ev){
        if (workCheckbox.checked === true && ev.type === 0) {
            filteredArray.push(ev);
        }
        if (sportCheckbox.checked === true && ev.type === 1) {
            filteredArray.push(ev);
        }
        if (musicCheckbox.checked === true && ev.type === 2) {
            filteredArray.push(ev);
        }
        if (otherCheckbox.checked === true && ev.type === 3) {
            filteredArray.push(ev);
        }
    })

    return filteredArray;
}


// Display current month's events
function setMonthEvents(){
    allStorage = JSON.parse(localStorage.getItem("localEventInfo"));
    //console.log("All storage", allStorage);
    
    // Only declaring month events if at least there's one event
    if (allStorage !== null){
        // Sorting by month & year
        let monthEvents = allStorage.filter(getMonthEvents);
        // Sorting by time
        monthEvents.sort(function(a, b){
            return a.startDate.milliseconds - b.startDate.milliseconds;
        });

        let filteredArray = filterType(monthEvents);

        filteredArray.forEach(function(monthEvent){
            let dayID = monthEvent.startDate.day;
            // Accessing the day that corresponds with event's day
            let dayEventsDiv = document.querySelector("#day" + dayID + " .eventsDiv");
            // Create and append the future event dic
            let newEventDiv = document.createElement("div");
            dayEventsDiv.appendChild(newEventDiv);
            //console.log("Appended", monthEvent.id);
            newEventDiv.setAttribute("class", "event");
            newEventDiv.setAttribute("id", "eventId"+monthEvent.id);
            newEventDiv.classList.add(typeOfEvents[monthEvent.type]+"Event");
            // Setting the title
            let capitalizedTitle = monthEvent.title.charAt(0).toUpperCase() + monthEvent.title.slice(1);
            newEventDiv.innerText = "•"+" "+" "+ capitalizedTitle;
            // Make it clickable
            newEventDiv.addEventListener('click', getEvent);
        })
    }else{
        allStorage = [];
    }
}

function setDailyEvents(){
    // Restoring all previous HTML content
    resetDaysContent();
    setMonthEvents();
}


// CALLING FUNCTIONS
//------------------------------------------------------------------------
setMonthEvents();
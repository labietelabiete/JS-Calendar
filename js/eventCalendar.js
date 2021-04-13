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

// Cleaning the month we are heading to
prevMonthBtn.addEventListener('click', function(){
    resetDaysContent(eventsDivs);
});
prevMonthBtn.addEventListener('click', setMonthEvents);
nextMonthBtn.addEventListener('click', setMonthEvents);
// Cleaning the month we are heading to
nextMonthBtn.addEventListener('click', function(){
    resetDaysContent(eventsDivs);
});


workCheckbox.addEventListener("change", setDailyEvents);
sportCheckbox.addEventListener("change", setDailyEvents);
musicCheckbox.addEventListener("change", setDailyEvents);
otherCheckbox.addEventListener("change", setDailyEvents);



document.getElementById("month").addEventListener("click", function(){
    resetDaysContent(eventsDivs);
});

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
    resetDaysContent(eventsDivs);

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

    console.log("Filtered array", filteredArray);
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

        let testArr = filterType(monthEvents);

        testArr.forEach(function(monthEvent){
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
    resetDaysContent(eventsDivs)
    setMonthEvents();
    for ( const d of eventsDivs ){
        console.log(d);
    }
}


// CALLING FUNCTIONS
//------------------------------------------------------------------------
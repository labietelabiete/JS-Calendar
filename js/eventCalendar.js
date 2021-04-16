// GLOBAL VARIABLES
//------------------------------------------------------------------------
let eventsDivs = document.querySelectorAll(".eventsDiv");
// Accessing all checkboxes
let allCheckboxes = document.querySelectorAll(".checkboxType input");

let workCheckbox = document.getElementById("workCheckbox");
let sportCheckbox = document.getElementById("sportCheckbox");
let musicCheckbox = document.getElementById("musicCheckbox");
let otherCheckbox = document.getElementById("otherCheckbox");
let workCheckboxMob = document.getElementById("workCheckboxMob"); // Mobile
let sportCheckboxMob = document.getElementById("sportCheckboxMob"); // Mobile
let musicCheckboxMob = document.getElementById("musicCheckboxMob"); // Mobile
let otherCheckboxMob = document.getElementById("otherCheckboxMob"); // Mobile
// Local storage by default
let allStorage = [];

// LISTENERS
//------------------------------------------------------------------------
saveEventButton.addEventListener('click', setDailyEvents);

prevMonthBtn.addEventListener('click', setMonthEvents);
nextMonthBtn.addEventListener('click', setMonthEvents);

// workCheckbox.addEventListener("change", setDailyEvents);
// sportCheckbox.addEventListener("change", setDailyEvents);
// musicCheckbox.addEventListener("change", setDailyEvents);
// otherCheckbox.addEventListener("change", setDailyEvents);


// Adding event listener to all checkboxes
for (let cB of allCheckboxes){
    cB.addEventListener("change", checkboxPairing)
    cB.addEventListener("change", setDailyEvents);
}

// Deleting all events (test button)
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
            var previousEvents = document.getElementsByClassName("eventId"+monthEvent.id);
            //console.log(previousEvents);
            if(previousEvents !== []){
                for (var e = previousEvents.length - 1; e >= 0; e--) {
                    // Remove first element (at [0]) repeatedly
                    previousEvents[0].parentNode.removeChild(previousEvents[0]);
                }
            }

        })
    }

}

// Function that creates event divs
function createEventDiv(dayID, eventID, eventType, eventTitle){
        // Accessing the day that corresponds with event's day
        let dayEventsDiv = document.querySelector("#day" + dayID + " .eventsDiv");
        // Create and append the future event div
        let newEventDiv = document.createElement("div");


        // Title container (wrapper)
        let newContainerDiv = document.createElement("div");
        if(eventTitle.length > 10) {
            newContainerDiv.setAttribute("class", "titleContainerId"+eventID);
            newContainerDiv.classList.add("titleContainer");
        } else {
            newContainerDiv.removeAttribute("class", "titleContainer");
        }

        // Wrapper
        dayEventsDiv.appendChild(newContainerDiv);
        // Actual event div
        newContainerDiv.appendChild(newEventDiv);


        //console.log("Appended", monthEvent.id);
        newEventDiv.setAttribute("class", "event");
        // Setting the id
        newEventDiv.setAttribute("id", "eventId"+eventID);
        // Setting the id as class (to be able to have it in multiple day events)
        newEventDiv.classList.add("eventId"+eventID);
        // Setting the type of event as class
        newEventDiv.classList.add(typeOfEvents[eventType]+"Event");
        // Setting the title
        let capitalizedTitle = eventTitle.charAt(0).toUpperCase() + eventTitle.slice(1);
        newEventDiv.innerText = "•"+" "+" "+ capitalizedTitle;
        // Make it clickable
        newEventDiv.addEventListener('click', getEvent);
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
            let startMil = monthEvent.startDate.milliseconds;
            let startDay = monthEvent.startDate.day;
            let startMonth = monthEvent.startDate.month;
            let endMil = monthEvent.endDate.milliseconds;
            let endDay = monthEvent.endDate.day;
            let endMonth = monthEvent.endDate.month;
            let startDayMonthLength = calculateMonthLength(monthEvent.startDate.year, monthEvent.startDate.month);
            // Default behaviour
            let dayDiff = (endDay - startDay); // We'll need to add one event div at least
            // console.log(monthEvent.title, startDay, endDay, dayDiff);
            //console.log(startMonth, endMonth);

            // Events that go through months
            if ( startMonth !== endMonth && endMonth !== null ){
                let millisecondsDiff = endMil - startMil;
                let dayDiff = Math.ceil(millisecondsDiff / (1000 * 60 * 60 * 24));
                let daysToEndMonth = startDayMonthLength - startDay;
                let daysFromStartMonth = dayDiff - daysToEndMonth;

                // console.log("Days to end month", daysToEndMonth);
                // console.log("Days from start month", daysFromStartMonth);

                // Adding days up until the end of the month
                for (let i=0; i<=daysToEndMonth; i++){
                    createEventDiv(dayID+i, monthEvent.id, monthEvent.type, monthEvent.title);
                }

                // Test print
                //console.log("Start day and end day are in different months");

            // Temporary else if statement for null end dates
            }else if (endDay === null){
                createEventDiv(dayID, monthEvent.id, monthEvent.type, monthEvent.title);

            // Events happenind in one day
            } else if (dayDiff === 0){
                createEventDiv(dayID, monthEvent.id, monthEvent.type, monthEvent.title);
                // Test print
                //console.log("Start day and end day are in the same day");

            // Events happening on different days but same month
            } else if ( startDayMonthLength > dayDiff > 0){
                // Creating a div for each day
                for (let d=0; d<=dayDiff; d++){
                    createEventDiv(dayID+d, monthEvent.id, monthEvent.type, monthEvent.title);
                    // Test print
                    //console.log("Start day and end day are in the same month");
                }

            // Other possibilites
            } else {
                console.log("End date is previous as start date");
            }

        })

    }else{
        allStorage = [];
    }
}

function setDailyEvents(eventCreated){
    // Restoring all previous HTML content
    resetDaysContent();
    setMonthEvents();
}

// Pairing checkboxes
function checkboxPairing(){
    // console.log(event.target.classList[0]);
    let pairs = document.getElementsByClassName(event.target.classList[0]);
    // Checked
    if (event.target.checked === true){
        for (let p of pairs){
            p.checked = true;
            // console.log(p);
            // console.log("Checked!");
        }
    }
    // Unchecked
    else {
        for (let p of pairs){
            p.checked = false;
            // console.log(p);
            // console.log("Unchecked!");
        }
    }
}


// CALLING FUNCTIONS
//------------------------------------------------------------------------
setMonthEvents();
//------------------------------------------------------------------------
// GLOBAL VARIABLES
//------------------------------------------------------------------------
let eventsDivs = document.querySelectorAll(".eventsDiv");
let expiredEventsContainer = document.getElementById("expiredEvents");
let expiredEventsBlock = document.getElementById("expiredEventsContainer");
let reminderBlock = document.getElementById("reminderContainer");

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



//------------------------------------------------------------------------
// EVENT LISTENERS
//------------------------------------------------------------------------
saveEventButton.addEventListener('click', setDailyEvents);
prevMonthBtn.addEventListener('click', setMonthEvents);
nextMonthBtn.addEventListener('click', setMonthEvents);

// Adding event listener to all checkboxes
for (let cB of allCheckboxes){
    cB.addEventListener("change", checkboxPairing)
    cB.addEventListener("change", setDailyEvents);
};

// Deleting all events (test button)
document.getElementById("month").addEventListener("click", function(){
    resetDaysContent(eventsDivs);
});


//------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------
// Get only current month's events
function getMonthEvents(obj){
    if(obj.startDate.year === currentYearNum && obj.startDate.month === currentMonthNum){
        return obj;
    } else {
        return false;
    };
};

// Removes all child nodes
function removeAllChildNodes(parent) {
    let parentChilds = parent.childNodes;
    for (let i=0; i<parentChilds.length; i++) {
        parent.removeChild(parentChilds[i]);
    }
};

// Removes all events from a given ID
function resetDaysContent(){

    if(allStorage.length > 0){

        let monthEvents = allStorage.filter(getMonthEvents);
        monthEvents.forEach(function(monthEvent){
            var previousEvents = document.getElementsByClassName("eventId"+monthEvent.id);

            if(previousEvents !== []){
                for (var e = previousEvents.length - 1; e >= 0; e--) {
                    // Remove first element (at [0]) repeatedly
                    previousEvents[0].parentNode.removeChild(previousEvents[0]);
                };

            };

        });

    };

};

// Create event divs
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

        // Setting attributes
        newEventDiv.setAttribute("class", "event"); // General class
        newEventDiv.setAttribute("id", "eventId"+eventID); // ID as css id
        newEventDiv.classList.add("eventId"+eventID); // ID as css class
        newEventDiv.classList.add(typeOfEvents[eventType]+"Event"); // Type of event
        let capitalizedTitle = eventTitle.charAt(0).toUpperCase() + eventTitle.slice(1);
        newEventDiv.innerText = "•"+" "+" "+ capitalizedTitle; // Title
        newEventDiv.addEventListener('click', getEvent);

}

// Filter type of events
function filterType(array){

    let filteredArray = new Array;
    array.forEach(function(ev){

        // Work
        if (workCheckbox.checked === true && ev.type === 0) {
            filteredArray.push(ev);
        };

        // Sport
        if (sportCheckbox.checked === true && ev.type === 1) {
            filteredArray.push(ev);
        };

        // Music
        if (musicCheckbox.checked === true && ev.type === 2) {
            filteredArray.push(ev);
        };

        // Other
        if (otherCheckbox.checked === true && ev.type === 3) {
            filteredArray.push(ev);
        };

    });

    // Get the filtered array
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

        // Sorting all by time (milliseconds)
        monthEvents.sort(function(a, b){
            return a.startDate.milliseconds - b.startDate.milliseconds;
        });

        // Only current month's events
        let filteredArray = filterType(monthEvents);

        filteredArray.forEach(function(monthEvent){

            // General variables
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

            // Events that go through months
            if ( startMonth !== endMonth && endMonth !== null ){
                let millisecondsDiff = endMil - startMil;
                let dayDiff = Math.ceil(millisecondsDiff / (1000 * 60 * 60 * 24));
                let daysToEndMonth = startDayMonthLength - startDay;
                let daysFromStartMonth = dayDiff - daysToEndMonth;

                // Adding days up until the end of the month
                for (let i=0; i<=daysToEndMonth; i++){
                    createEventDiv(dayID+i, monthEvent.id, monthEvent.type, monthEvent.title);
                };

                // Test print
                console.log("Start day and end day are in different months");

            // Temporary else if statement for null end dates
            }else if (endDay === null){
                createEventDiv(dayID, monthEvent.id, monthEvent.type, monthEvent.title);

            // Events happenind in one day
            } else if (dayDiff === 0){
                createEventDiv(dayID, monthEvent.id, monthEvent.type, monthEvent.title);

                // Test print
                console.log("Start day and end day are in the same day");

            // Events happening on different days but same month
            } else if ( startDayMonthLength > dayDiff > 0){
                // Creating a div for each day
                for (let d=0; d<=dayDiff; d++){
                    createEventDiv(dayID+d, monthEvent.id, monthEvent.type, monthEvent.title);

                    // Test print
                    console.log("Start day and end day are in the same month");

                };

            // Other possibilites
            } else {
                console.log("End date is previous as start date");
            };

        });

    }else{
        allStorage = [];

    };
};

// Shows expired events sidebar
function showExpiredEvents(){

    // Gathering every previous expired event inside the expired event div
    let expiredEvents = expiredEventsContainer.childNodes;

    // Hide expired events container if there are no expired events
    if (expiredEvents.length === 0){
        expiredEventsBlock.style.display = "none";
        reminderBlock.style.top = "79px";
    };

    // Cleaning the expired events div
    while(expiredEvents.length > 0){
        expiredEventsContainer.removeChild(expiredEventsContainer.firstChild);
    };

    // Gathering every event stored in local storage
    let allLocalStorageEvents = JSON.parse(localStorage.getItem("localEventInfo"));

    if(allLocalStorageEvents !== null){

    // Checking every event to see if they have expired and
    // if that is the case then creating a new div node
    // to append to the expired events div container
    allLocalStorageEvents.forEach(function (event){

        // Getting current date to compare with endDate for the event
        let currentDate = new Date().getTime();

        if(event.endDate.milliseconds - currentDate <= 0){

            // Mark expired events in red
            var expiredEvents = document.querySelectorAll("#eventId"+event.id);
            expiredEvents.forEach(function(ele){
                // Add expired class to style it
                ele.classList.add("expiredEvent");
                // Removes previous class
                ele.classList.remove(typeOfEvents[event.type]+"Event");
            });

            // Creating new string div to inject to expired events div
            let expiredEventDiv = "<div id = expiredEvent";
            let expiredEventClassType;

            switch (event.type) {

                case 0:
                    expiredEventClassType = "workExpiredEvent";
                    expiredEventDiv += event.id + " class = " + expiredEventClassType;
                    break;

                case 1:
                    expiredEventClassType = "sportExpiredEvent";
                    expiredEventDiv += event.id + " class = " + expiredEventClassType;
                    break;

                case 2:
                    expiredEventClassType = "musicExpiredEvent";
                    expiredEventDiv += event.id + " class = " + expiredEventClassType;
                    break;

                case 3:
                    expiredEventClassType = "otherExpiredEvent";
                    expiredEventDiv += event.id + " class = " + expiredEventClassType;
                    break;

                default:
                    expiredEventClassType = "defaultExpiredEvent";
                    expiredEventDiv += event.id + " class = " + expiredEventClassType;
                    break;
            };

            // Finishing html string and injecting it
            expiredEventDiv += ">" + event.title + "</div>";
            expiredEventsContainer.insertAdjacentHTML('beforeend', expiredEventDiv);

            // Adding listener to show expired event
            document.getElementById("expiredEvent" + event.id).addEventListener('click', getEvent);

        };

    });

        // Changing display for expired events container
        // and reminder container if there are expired events
        if(expiredEvents.length > 0){
            expiredEventsBlock.style.display = "flex";
            reminderBlock.style.top = "38px";
        };

    }else{
        allLocalStorageEvents = [];
    };

};

// Creating a new event and refreshing current month
function setDailyEvents(eventCreated){
    // Restoring all previous HTML content
    resetDaysContent();
    setMonthEvents();
};

// Trigger expired events
function triggerExpiredEvents(){
    setInterval(showExpiredEvents, 1000);
};

// Pairing checkboxes (desktop & mobile)
function checkboxPairing(){
    let pairs = document.getElementsByClassName(event.target.classList[0]);
    // Checked
    if (event.target.checked === true){
        for (let p of pairs){
            p.checked = true;
        }
    }
    // Unchecked
    else {
        for (let p of pairs){
            p.checked = false;
        }
    }
}



//------------------------------------------------------------------------
// CALLING FUNCTIONS
//------------------------------------------------------------------------
setMonthEvents();
showExpiredEvents();
triggerExpiredEvents();




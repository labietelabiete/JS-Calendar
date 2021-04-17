// GLOBAL VARIABLES
//------------------------------------------------------------------------
// Html elements
var monthAndYear = document.getElementById("monthAndYear");
var monthTitle = document.getElementById("month");
var yearTitle = document.getElementById("year");
var calendarGrid = document.getElementById("calendarCont");
var prevMonthBtn = document.getElementById("previousMonthButton");
var nextMonthBtn = document.getElementById("nextMonthButton");
var currentMonthDays = document.getElementsByClassName("currentMonthDay");
var date = new Date();
var clickedDay;
var today;
let gridCells = 35; // Seven days by 5 weeks by default
let currentMonth;

// Type of events
var typeOfEvents = ["work", "sport", "music", "other"]

// Time numbers
var currentDayNum = date.getDate();
var currentMonthNum = date.getMonth()+1;
var onloadMonth = currentMonthNum;
var currentYearNum = date.getFullYear();
var onloadYear = currentYearNum
var firstDay = new Date(currentYearNum, currentMonthNum-1, 1).getDay();

//Time lengths
var currentMonthLength = new Date(currentYearNum, currentMonthNum, 0).getDate();
var prevMonthLength;

// Month names
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// DEFAULT HTML
//------------------------------------------------------------------------
monthTitle.innerText = monthNames[currentMonthNum-1];
yearTitle.innerText = currentYearNum;


// FUNCTIONS
//------------------------------------------------------------------------
// Set previous month length by default
function onLoadPrevMonthLength(currentMonth){
    if (currentMonthNum == 1){
        prevMonthLength = new Date(currentYearNum-1, 12, 0).getDate();
    } else {
        prevMonthLength = new Date(currentYearNum, currentMonthNum-1, 0).getDate();
    }
}
// Load default previous month's length
onLoadPrevMonthLength(currentMonthNum);

// Setting up current month day DIV (numberDiv & eventsDiv)
function setUpDay(dayDiv, dayNumber, className, isCurrentMonth){
    calendarGrid.appendChild(dayDiv);

    if (isCurrentMonth === true){
        dayDiv.setAttribute("id", "day" + dayNumber);
    }

    dayDiv.setAttribute("class", className);
    dayDiv.classList.add("dayDiv");

    // Creating sub divs
    numberDiv = document.createElement("div");
    dayDiv.appendChild(numberDiv);

    // Setting numberDiv class if its current month
    if (isCurrentMonth === true){
        numberDiv.setAttribute("class", "numberDiv");
    } else {
        numberDiv.setAttribute("class", "otherNumberDiv");
    }

    numberDiv.innerText = dayNumber;

    eventsDiv = document.createElement("div");
    eventsDiv.setAttribute("class", "eventsDiv")
    dayDiv.appendChild(eventsDiv);
}

// Appending items to calendar's grid
function appendDays(lastMonthLength, startingDay, monthLength){
    //Substitute 0 by 7 when current month starts on Sunday
    if (startingDay == 0){
        startingDay = 7;
    }

    // Previous month (adding div)
    let prevDays = startingDay-1;
    for(let p=lastMonthLength-prevDays+1; p<=lastMonthLength; p++){
        let prevDay = document.createElement("div");
        setUpDay(prevDay, p, "prevMonthDay", false);
    }

    // Current month (adding div)
    for(let c=1; c<=monthLength; c++){
        let newDay = document.createElement("div");
        setUpDay(newDay, c, "currentMonthDay", true);
        // Setting initial day of the month (column)
        if(c === 1){
            newDay.style.gridColumnStart = startingDay;
        };
    }

    // Changing the number of rows depending on current month's length
    if ( startingDay === 7 && monthLength >= 30 ){
        calendarGrid.style.gridTemplateRows = "repeat(6, 1fr)";
        gridCells = 42;
    } else if ( startingDay === 6 && monthLength === 31 ){
        calendarGrid.style.gridTemplateRows = "repeat(6, 1fr)";
        gridCells = 42;
    } else {
        calendarGrid.style.gridTemplateRows = "repeat(5, 1fr)";
        gridCells = 35;
    }

    // Next month (adding div)
    let nextDays = gridCells - (prevDays + monthLength);
    for(let n=1; n<=nextDays; n++){
        let nextDay = document.createElement("div");
        setUpDay(nextDay, n, "nextMonthday", false);
    }
};

// Highlight today
function highlighToday(originalYear, currentYear, originalMonth, currentMonth, currentDayNum, border){
    if (originalYear === currentYear && originalMonth === currentMonth){
        let todayDiv = document.getElementById("day" + currentDayNum);
        todayDiv.classList.add("today");
    }
};

// Calculate month length
function calculateMonthLength(year, month){
    let monLength = new Date(year, month, 0).getDate();
    return monLength;
};

// Get weekday of the first day
function getFirstDay(year, month){
    let firstDay = new Date(year, month-1, 1).getDay();
    return firstDay;
}


// EVENT LISTENERS
//------------------------------------------------------------------------
// Previous month button
prevMonthBtn.addEventListener("click", resetPrevMonth);

function resetPrevMonth(){
    // Emptying grid container before assigning previous month
    calendarGrid.innerHTML = "";
    // January
    if (currentMonthNum == 1){
        currentYearNum--;
        currentMonthNum = 12;
        console.log("December!")
        // Updating HTML elements
        monthTitle.innerText = monthNames[currentMonthNum-1];
        yearTitle.innerText = currentYearNum;
        // Getting previous month length
        previousMonthLength = calculateMonthLength(currentYearNum, currentMonthNum-1);

    } else if (currentMonthNum == 2){
        currentMonthNum--;
        // Updating HTML elements
        monthTitle.innerText = monthNames[currentMonthNum-1];
        // Getting previous month length
        previousMonthLength = calculateMonthLength(currentYearNum-1, 12);

    } else {
        currentMonthNum--;
        // Updating HTML elements
        monthTitle.innerText = monthNames[currentMonthNum-1];
        // Getting previous month length
        previousMonthLength = calculateMonthLength(currentYearNum, currentMonthNum-1);

    }
    // Assigning current month's length
    currentMonthLength = calculateMonthLength(currentYearNum, currentMonthNum);
    // Get first day's weekday
    firstDay = getFirstDay(currentYearNum, currentMonthNum);
    // Setting new calendar gridH
    appendDays(previousMonthLength,firstDay,currentMonthLength);
    highlighToday(onloadYear, currentYearNum, onloadMonth, currentMonthNum, currentDayNum, 10);

    console.log("Prev month!")
 }
// Next month button
nextMonthBtn.addEventListener("click", resetNextMonth);

function resetNextMonth(){
    // Emptying grid container before assigning next month
    calendarGrid.innerHTML = "";
    //document.querySelector("main").style.animation = "none";
    document.querySelector("main").style.animation = "monthAnimation 2s 1";
    setTimeout(()=> {
        document.querySelector("main").style.animation = "none";
    }, 1000);
    
    //December
    if (currentMonthNum == 12){
        currentYearNum++;
        currentMonthNum = 1;
        console.log("Happy new year " + currentYearNum + "!");
        // Updating HTML elements
        monthTitle.innerText = monthNames[currentMonthNum-1];
        yearTitle.innerText = currentYearNum;
        // Getting previous month length
        previousMonthLength = calculateMonthLength(currentYearNum-1, 12);
    } else {
        currentMonthNum++;
        // Updating HTML elements
        monthTitle.innerText = monthNames[currentMonthNum-1];
        // Getting previous month length
        previousMonthLength = calculateMonthLength(currentYearNum, currentMonthNum-1);
    }
    // Assigning current month's length
    currentMonthLength = calculateMonthLength(currentYearNum, currentMonthNum);
    // Get first day's weekday
    firstDay = getFirstDay(currentYearNum, currentMonthNum);
    // Setting new calendar grid
    appendDays(previousMonthLength,firstDay,currentMonthLength);
    highlighToday(onloadYear, currentYearNum, onloadMonth, currentMonthNum, currentDayNum, 10);
    console.log("Next month!")
}

// Default call: arrow keyboard event to navigate to the previous and next months.
document.addEventListener('keydown', handleArrowKeys);
function handleArrowKeys(event) {
    switch (event.keyCode) {
            case 37:
                resetPrevMonth();
                setMonthEvents();
                break;
            case 39:
                resetNextMonth();
                setMonthEvents();
                break;
    }
}


// CALLING FUNCTIONS
//------------------------------------------------------------------------
appendDays(prevMonthLength,firstDay,currentMonthLength);
highlighToday(onloadYear, currentYearNum, onloadMonth, currentMonthNum, currentDayNum, 10);



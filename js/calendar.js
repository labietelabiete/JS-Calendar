// GLOBAL VARIABLES
//------------------------------------------------------------------------
// Html elements
var calendarBody = document.querySelector("body");
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

// Time numbers
var currentDayNum = date.getDate();
var currentMonthNum = date.getMonth()+1;
var onloadMonth = currentMonthNum;
var currentYearNum = date.getFullYear();
var onloadYear = currentYearNum
var firstDay = new Date(currentYearNum, currentMonthNum-1, 1).getDay();

// Time lengths
var currentMonthLength = new Date(currentYearNum, currentMonthNum, 0).getDate();
var prevMonthLength;

// Month names
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Season names
var seasons = ["winter", "winter", "spring", "spring", "spring", "summer", "summer", "summer", "fall", "fall", "fall", "winter"];

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

// Appending items to calendar's grid
function appendDays(lastMonthLength, startingDay, monthLength){

    //Substitute 0 by 7 when current month starts on Sunday
    if (startingDay == 0){
        startingDay = 7;
    }

    // Previous month (adding div)
    let prevDays = startingDay-1;
    for(let p=lastMonthLength-prevDays+1; p<=lastMonthLength; p++){

        let newDay = document.createElement("div");
        calendarGrid.appendChild(newDay);
        newDay.setAttribute("class", "prevMonthDay");
        // Assigning day number
        newDay.innerText = p;
    }

    // Current month (adding div)
    for(let c=1; c<=monthLength; c++){

        let newDay = document.createElement("div");
        calendarGrid.appendChild(newDay);
        newDay.setAttribute("id", "day" + c);
        newDay.setAttribute("class", "currentMonthDay");

        // Highlight selected day (by user)
        newDay.addEventListener("click", function(event){
            if(event.target !== today){
                // First selected day
                if (clickedDay === undefined){
                    // Highlight day
                    clickedDay = event.target;
                    clickedDay.style.color = "lightgray";
                // Next selections
                } else{
                    clickedDay.style.color = "black";
                    clickedDay = undefined;
                    // Highlight day
                    clickedDay = event.target;
                    clickedDay.style.color = "lightgray";
                }
            }
        });
        // Setting initial day of the month (column)
        if(c === 1){
            newDay.style.gridColumnStart = startingDay;
        };
        // Assigning day number
        newDay.innerText = c;
    }

    // Changing the number of rows depending on current month's length
    if ( startingDay === 7 && monthLength >= 30 ){
        calendarGrid.style.gridTemplateRows = "repeat(6, 1fr)";
        gridCells = 42;
    } else if ( startingDay === 6 && monthLength === 31 ){
        calendarGrid.style.gridTemplateRows = "repeat(6, 1fr)";
        gridCells = 42;
    } else  {
        calendarGrid.style.gridTemplateRows = "repeat(5, 1fr)";
        gridCells = 35;
    }

    // Next month (adding div)
    let nextDays = gridCells - (prevDays + monthLength);
    for(let n=1; n<=nextDays; n++){
        let newDay = document.createElement("div");
        calendarGrid.appendChild(newDay);
        newDay.setAttribute("class", "nextMonthday");
        // Assigning day number
        newDay.innerText = n;
    }

};

// Highlight today
function highlighToday(originalYear, currentYear, originalMonth, currentMonth, currentDayNum, border){
    if (originalYear === currentYear && originalMonth === currentMonth){
        let todayDiv = document.getElementById("day" + currentDayNum);
        todayDiv.classList.add("today");
        todayDiv.style.backgroundColor = "yellow";
        // Capturing today div
        today = document.querySelector(".today");
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
prevMonthBtn.onclick = function(){
    // Emptying grid container before assigning previous month
    calendarGrid.innerHTML = "";
    console.log(currentMonthNum);
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
    // Setting new calendar grid
    appendDays(previousMonthLength,firstDay,currentMonthLength);
    highlighToday(onloadYear, currentYearNum, onloadMonth, currentMonthNum, currentDayNum, 10);
    seasonChange(currentMonthNum);
}

// Next month button
nextMonthBtn.onclick = function(){
    // Emptying grid container before assigning next month
    calendarGrid.innerHTML = "";

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
    seasonChange(currentMonthNum);
}

// Season change 
function seasonChange(currentMonthNum){
    
    // Capturing current month 
    let month = monthNames[currentMonthNum - 1];

    // Deciding body color depending on month
    switch (month){
        case "January":
            calendarBody.className = "january";
            break;
        case "February":
            calendarBody.className = "february";
            break;
        case "March":
            calendarBody.className = "march";
            break;
        case "April":
            calendarBody.className = "april";
            break;
        case "May":
            calendarBody.className = "may";
            break;
        case "June":
            calendarBody.className = "june";
            break;
        case "July":
            calendarBody.className = "july";
            break;
        case "August":
            calendarBody.className = "august";
            break;  
        case "September":
            calendarBody.className = "september";
            break;
        case "October":
            calendarBody.className = "october";
            break; 
        case "November":
            calendarBody.className = "november";
            break; 
        case "December":
            calendarBody.className = "december";
            break;  
    }
}

// CALLING FUNCTIONS
//------------------------------------------------------------------------
appendDays(31,firstDay,currentMonthLength);
highlighToday(onloadYear, currentYearNum, onloadMonth, currentMonthNum, currentDayNum, 10);
seasonChange(currentMonthNum);

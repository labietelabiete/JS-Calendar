// Global variables
var monthTitle = document.getElementById("month");
var yearTitle = document.getElementById("year");
var calendarGrid = document.getElementById("calendarCont");
var prevMonthBtn = document.getElementById("previousMonthButton");
var nextMonthBtn = document.getElementById("nextMonthButton");
var calendarFontSize =  "40px";
var date = new Date();
// Time numbers
var currentDayNum = date.getDate();
var currentMonthNum = date.getMonth()+1;
var currentYearNum = date.getFullYear();
var firstDay;
//Time lengths
var currentMonthLength = new Date(currentYearNum, currentMonthNum, 0).getDate();
var prevMonthLength;
// Month names
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// Default HTML values
monthTitle.innerText = monthNames[currentMonthNum-1];
yearTitle.innerText = currentYearNum;

// Set previous month length by default
function onLoadPrevMonthLength(currentMonth){
    if (currentMonthNum == 1){
        prevMonthLength = new Date(currentYearNum-1, 12, 0).getDate();
    } else {
        prevMonthLength = new Date(currentYearNum, currentMonthNum-1, 0).getDate();
    }
}

onLoadPrevMonthLength(currentMonthNum);

// Appending items to calendar's grid
function appendDays(lastMonthLength, startingDay, monthLength){

    // Inserting and styling days of previous month
    let prevDays = startingDay-1;

    for(let p=lastMonthLength-prevDays+1; p<=lastMonthLength; p++){

        let newDay = document.createElement("div");
        calendarGrid.appendChild(newDay);
        newDay.setAttribute("class", "prevMonthDay");

        newDay.style.fontSize = calendarFontSize;
        newDay.style.fontWeight = "200";
        newDay.style.textAlign ="left";
        newDay.style.paddingTop = "5px";
        newDay.style.borderTop = "2px black solid";
        newDay.innerText = p;
    }

    // Inserting and styling days of current month
    for(let c=1; c<=monthLength; c++){

        let newDay = document.createElement("div");
        calendarGrid.appendChild(newDay);
        newDay.setAttribute("id", "day" + c);

        if(c === 1){
            newDay.style.gridColumnStart = startingDay;
        }

        newDay.style.fontSize = calendarFontSize;
        newDay.style.fontWeight = "700";
        newDay.style.textAlign ="left";
        newDay.style.paddingTop = "5px";
        newDay.style.borderTop = "2px black solid";
        newDay.innerText = c;
    }

    // Inserting and styling days of next month
    let nextDays = 42 - (prevDays + monthLength);

    for(let n=1; n<=nextDays; n++){

        let newDay = document.createElement("div");
        calendarGrid.appendChild(newDay);
        newDay.setAttribute("class", "nextMonthday");

        newDay.style.fontSize = calendarFontSize;
        newDay.style.fontWeight = "200";
        newDay.style.textAlign ="left";
        newDay.style.paddingTop = "5px";
        newDay.style.borderTop = "2px black solid";
        newDay.innerText = n;
    }
};

// Highlight today
function highlighToday(currentDayNum, border){
    let todayDiv = document.getElementById("day" + currentDayNum);
    todayDiv.style.borderTop = `${border}px black solid`;
};

function calculateMonthLength(year, month){
    let currentMonth = new Date(year, month, 0).getDate();
    console.log(currentMonth);
};

// Time calculations >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Previous month button
prevMonthBtn.onclick = function(){
    // January
    if (currentMonthNum == 1){
        currentYearNum--;
        currentMonthNum = 12;
        console.log("December!")
        // Updating HTML elements
        monthTitle.innerText = monthNames[currentMonthNum-1];
        yearTitle.innerText = currentYearNum;
    } else if (currentMonthNum == 2){
        currentMonthNum--;
        // Updating HTML elements
        monthTitle.innerText = monthNames[currentMonthNum-1];
    } else {
        currentMonthNum--;
        // Updating HTML elements
        monthTitle.innerText = monthNames[currentMonthNum-1];
    }
}

// Next month button
nextMonthBtn.onclick = function(){
    //December
    if (currentMonthNum == 12){
        currentYearNum++;
        currentMonthNum = 1;
        console.log("Happy new year " + currentYearNum + "!");
        // Updating HTML elements
        monthTitle.innerText = monthNames[currentMonthNum-1];
        yearTitle.innerText = currentYearNum;
    } else {
        currentMonthNum++;
        // Updating HTML elements
        monthTitle.innerText = monthNames[currentMonthNum-1];
    }
    calculateMonthLength(currentYearNum, currentMonthNum);
}

// Calling all functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
appendDays(31,4,30);
highlighToday(currentDayNum, 10);


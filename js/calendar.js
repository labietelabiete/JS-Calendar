// Global calendar
var calendarGrid = document.getElementById("calendarCont");
var calendarFontSize =  "40px";
var todayMonthNumber = new Date().getDate();

function appendDays(lastMonthLength, startingDay, monthLength){
    
    // Inserting and styling days of previous month
    let prevDays = startingDay - 1;

    for(let p=lastMonthLength - prevDays + 1; p<=lastMonthLength; p++){

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
}

function highlighToday(todayMonthNumber, border){

    let todayDiv = document.getElementById("day" + todayMonthNumber);

    todayDiv.style.borderTop = `${border}px black solid`;

}

appendDays(31,4,30);
highlighToday(todayMonthNumber, 10);


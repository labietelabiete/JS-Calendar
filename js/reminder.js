console.log(eventInfoArray)
let sideBar = document.querySelector("#sideBar");
console.log(sideBar);
let reminderArray = []
eventInfoArray.forEach(eachEvent => {
    var reminderTime = new Date(eachEvent.endDate.milliseconds - eachEvent.reminder * 60000)
    console.log(reminderTime)
    
})
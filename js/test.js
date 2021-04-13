let sideBar = document.querySelector("#sideBar");
console.log(sideBar);
let myLocalStorage = JSON.parse(localStorage.getItem("localEventInfo"));

const test = () => {
    var newDiv = document.createElement("div");
    var newUl = document.createElement("ul")
    newUl.setAttribute("id", "warningBox");
    sideBar.prepend(newUl);
    var newList = document.createElement("li")  
  setInterval(() => {
    myLocalStorage.forEach((eachEvent) => {
      if (eachEvent.reminder) {
        let eachEndDate = eachEvent.endDate;
        let formattedEndDate = new Date(
          eachEndDate.year,
          eachEndDate.month - 1,
          eachEndDate.day,
          eachEndDate.hour,
          eachEndDate.minutes,
          eachEndDate.minutes
        );
        let reminderToMS = eachEvent.reminder * 60000;
        let reminderTime = new Date(formattedEndDate - reminderToMS)
          .toLocaleString()
          .replace(/(.*)\D\d+/, "$1");
        let currentTime = new Date()
          .toLocaleString()
          .replace(/(.*)\D\d+/, "$1");
        let endDateTime = formattedEndDate
          .toLocaleString()
          .replace(/(.*)\D\d+/, "$1");
         
        if (formattedEndDate > new Date()) {
          console.log("reminder time", reminderTime);
          console.log("current time", currentTime);
          console.log(endDateTime <= currentTime);
          if (reminderTime === currentTime) {
            
            newDiv.innerText = `${eachEvent.title} will expire at ${endDateTime}`;
            sideBar.prepend(newDiv);
          }
        } else if (endDateTime <= currentTime) {
            
          document.getElementById("warningBox").innerHTML = `<li>${eachEvent.title} has expired.</li>`;
            
            
        }
      }
    });
  }, 10000);
};

test();

const dateFormat = require("dateformat");
const axios = require("axios");
const cron = require("node-cron");

// loop logic works for checking if date == now for cron job
/*
axios
  .get("http://127.0.0.1:2017/public/walkingevents")
  .then(res => {
    res.data.events.map(event => {
      console.log("we are in map loop");
      if (event.date == now) {
        console.log("NOW!!!!", "event id " + event.id);
      } else {
        console.log("NOT NOW REEE");
      }
    });
  })
  .catch(err => {
    //console.log(err);
  });
*/
/*
events.forEach(event => {
  console.log(event);
});
*/

// make a custom AM/PM checker because i'm lazy as fuck and would rather go down this route
// input current time and event time
/*
time = (now, event_time) => {
  console.log(now, event_time, "THESE ARE THE TIMES GIVEN");
  if (
    now.slice(-2).toLowerCase() == "am" &&
    event_time.slice(-2).toLowerCase() == "am"
  ) {
    if (now.slice(-7) >= event_time.slice(-7)) {
      return true;
    } else {
      return false;
    }
  } else if (
    now.slice(-2).toLowerCase() == "am" &&
    event_time.slice(-2).toLowerCase() == "pm"
  ) {
    return false;
  } else if (
    now.slice(-2).toLowerCase() == "pm" &&
    event_time.slice(-2).toLowerCase() == "am"
  ) {
    return true;
  } else if (
    now.slice(-2).toLowerCase() == "pm" &&
    event_time.slice(-2).toLowerCase() == "pm"
  ) {
    if (now.slice(-7) >= event_time.slice(-7)) {
      console.log("WHY IS THIS TRUE", now.slice(-7), event_time.slice(-7));
      return true;
    } else {
      console.log("FALSE", now.slice(-7), event_time.slice(-7));
      return false;
    }
  }
};
*/

const check1 = "5:25pm";
const check2 = "8:00pm";

const date1 = "2019-03-29";
const date2 = "2019-03-29";

//console.log(time(check1, check2));

console.log(date1 <= date2);

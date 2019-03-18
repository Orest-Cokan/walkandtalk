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

<<<<<<< HEAD
const check1 = "Sun, Mar 20 12:00am";
const check2 = "Sun, Mar 20 1:00am";

=======
>>>>>>> 5cd899262b1636db64d0e2f5ac7c3f2b7a836c46
time = (now, event_time) => {
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
      return true;
    } else {
      return false;
    }
  }
};

<<<<<<< HEAD
console.log(time(check1, check2));
//console.log(check1.slice(-8, -6));
=======
const check1 = "Mon, Mar 18 12:00pm";
const check2 = "Mon, Mar 18 12:00pm";

console.log(time(check1, check2));
>>>>>>> 5cd899262b1636db64d0e2f5ac7c3f2b7a836c46

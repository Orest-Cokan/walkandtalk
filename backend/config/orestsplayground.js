const dateFormat = require("dateformat");
const axios = require("axios");

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

const now = dateFormat(new Date(), "ddd, mmm d");
console.log(now);

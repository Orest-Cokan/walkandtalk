const cron = require("node-cron");
const dateFormat = require("dateformat");
const WalkingEvent = require("../api/models/WalkingEvent");
const Location = require("../api/models/Location");
const Attendee = require("../api/models/Attendee");
const time = require("../api/utils/datechecker");

// cron job check for events to delete every hour
var task = cron.schedule("0 * * * *", () => {
  const today = dateFormat(new Date(), "ddd, mmm d");
  const now = dateFormat(new Date(), "ddd, mmm d hh:MMtt");
  WalkingEvent.findAll({
    where: { date: today },
    include: [
      {
        model: Attendee
      },
      {
        model: Location
      }
    ]
  }).then(events => {
    let i = 0;
    let compareDateTime = null;
    events.map(event => {
      compareDateTime = event.date + " " + event.start_time;
      if (time(now, compareDateTime)) {
        console.log(compareDateTime, "NUKED WALKING EVENTS");
        WalkingEvent.destroy({
          where: {
            id: event.id
          },
          include: [Attendee, Location]
        });
      }
      console.log(event.id, "this is a single event", i);
      console.log(
        event.title,
        event.date,
        event.start_time,
        "title and date start time"
      );
      i++;
    });
  });

  console.log("running a task every minute");
});

module.exports = task;

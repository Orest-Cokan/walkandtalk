const cron = require("node-cron");
const dateFormat = require("dateformat");
const WalkingEvent = require("../api/models/WalkingEvent");
const Location = require("../api/models/Location");
const Attendee = require("../api/models/Attendee");
const time = require("../api/utils/datechecker");
const WalkingRecord = require("../api/models/WalkingRecord");

// cron job check for events to delete every hour
var task = cron.schedule("* * * * *", () => {
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
    let compareDateTime = null;
    events.map(event => {
      compareDateTime = event.date + " " + event.end_time;
      if (time(now, compareDateTime)) {
        event.attendees.map(person => {
          WalkingRecord.create({
            organizer: event.organizer,
            fullname: person.name,
            title: event.title,
            email: person.email,
            venue: event.venue,
            start_time: event.start_time,
            date: event.date,
            location: event.location.streetName,
            distance: null,
            duration: null,
            intensity: null,
            walk_rating: null,
            walk_rating_comment: null,
            location_rating: null,
            location_rating_comment: null,
            completed: 0
          });
        });
        WalkingRecord.create({
          organizer: event.organizer,
          fullname: event.organizer,
          title: event.title,
          email: event.email,
          venue: event.venue,
          start_time = event.start_time,
          date:event.date,
          location: event.location.streetName,
          distance: null,
          duration: null,
          intensity: null,
          walk_rating: null,
          walk_rating_comment: null,
          location_rating: null,
          location_rating_comment: null,
          completed: 0
        });
        WalkingEvent.destroy({
          where: {
            id: event.id
          },
          include: [Attendee, Location]
        });
        console.log(compareDateTime, "NUKED WALKING EVENTS");
      }
    });
  });

  console.log("running a task every minute");
});

module.exports = task;

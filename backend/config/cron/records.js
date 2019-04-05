const cron = require("node-cron");
const dateFormat = require("dateformat");
const WalkingEvent = require("../../api/models/WalkingEvent");
const Location = require("../../api/models/Location");
const Attendee = require("../../api/models/Attendee");
const time = require("../../api/utils/datechecker");
const WalkingRecord = require("../../api/models/WalkingRecord");
const Notification = require("../../api/models/Notification");

// cron job check for events to delete every hour
var task = cron.schedule("* 0 * * *", () => {
  let nukedTotal = 0;
  let recordsMade = 0;
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
      compareDateTime = event.date + " " + event.start_time;
      console.log(
        "Executing cron job: " + time(now.toString(), compareDateTime)
      );
      if (time(now, compareDateTime)) {
        event.attendees.map(person => {
          WalkingRecord.create({
            organizer: event.organizer,
            fullname: person.name,
            title: event.title,
            email: person.email,
            venue: event.venue,
            start_time: event.start_time,
            end_time: event.end_time,
            date: event.date,
            location: event.location.streetName,
            total_attendees: event.total_attendees,
            distance: null,
            duration: null,
            intensity: null,
            walk_rating: null,
            walk_rating_comment: null,
            location_rating: null,
            location_rating_comment: null,
            completed: 0
          });
          recordsMade = recordsMade + 1;
          // Send notification to event organizer
          Notification.create({
            email: event.email,
            isRead: 0,
            type: 'eventRecord',
            subjectId: event.id,
            title: event.title
          });
          // Send notification to event attendees
          event.attendees.map(attendee => {
            Notification.create({
              email: attendee.email,
              isRead: 0,
              type: 'eventRecord',
              subjectId: event.id,
              title: event.title
            });
          });
        });
        WalkingRecord.create({
          organizer: event.organizer,
          fullname: event.organizer,
          title: event.title,
          email: event.email,
          venue: event.venue,
          start_time: event.start_time,
          end_time: event.end_time,
          date: event.date,
          location: event.location.streetName,
          total_attendees: event.total_attendees,
          distance: null,
          duration: null,
          intensity: null,
          walk_rating: null,
          walk_rating_comment: null,
          location_rating: null,
          location_rating_comment: null,
          completed: 0
        });
        // Send notification to event organizer
        Notification.create({
          email: event.email,
          isRead: 0,
          type: 'eventRecord',
          subjectId: event.id,
          title: event.title
        });
        // Send notification to event attendees
        event.attendees.map(attendee => {
          Notification.create({
            email: attendee.email,
            isRead: 0,
            type: 'eventRecord',
            subjectId: event.id,
            title: event.title
          });
        });
        recordsMade = recordsMade + 1;
        WalkingEvent.destroy({
          where: {
            id: event.id
          },
          include: [Attendee, Location]
        });
        nukedTotal = nukedTotal + 1;
        console.log("Nuked a total of " + nukedTotal + " walking events");
        console.log(
          "Made a total of  " +
            recordsMade +
            " walking records to be filled in"
        );
      }
    });
  });
});

module.exports = task;

const cron = require("node-cron");
const dateFormat = require("dateformat");
const WalkingEvent = require("../../api/models/WalkingEvent");
const Location = require("../../api/models/Location");
const Attendee = require("../../api/models/Attendee");
const Notification = require("../../api/models/Notification");

// This task sends notifications to event organizers and attendees on the day of the event
// Scheduled every 1:00 AM 
var upcomingEvent = cron.schedule("0 1 * * * ", () => {
  console.log("Running notification task - upcomingEvent ");
  const today = dateFormat(new Date(), "ddd, mmm d");
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
    events.map(event => {
      console.log(today.toString(), event.date);
      if (today.toString() == event.date) {
        // Send notification to event organizer
        Notification.create({
          email: event.email,
          isRead: 0,
          type: 'upcomingEvent',
          subjectId: event.id
        });
        // Send notification to event attendees
        event.attendees.map(attendee => {
          Notification.create({
            email: attendee.email,
            isRead: 0,
            type: 'upcomingEvent',
            subjectId: event.id,
          });
        });
      }
    });
  });
});
module.exports = upcomingEvent;


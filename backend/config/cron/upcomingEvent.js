const cron = require("node-cron");
const dateFormat = require("dateformat");
const WalkingEvent = require("../../api/models/WalkingEvent");
const Location = require("../../api/models/Location");
const Attendee = require("../../api/models/Attendee");
const Notification = require("../../api/models/Notification");

// This task sends notifications to event organizers and attendees on the day of the event
// Scheduled everyday at 1:00 AM 
const upcomingEvent = () =>
  cron.schedule("0 1 * * * ", () => {
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
        // Send notification to event organizer
        Notification.create({
          email: event.email,
          isRead: 0,
          type: 'upcomingEvent',
          subjectId: event.id,
          title: event.title
        });
        // Send notification to event attendees
        event.attendees.map(attendee => {
          Notification.create({
            email: attendee.email,
            isRead: 0,
            type: 'upcomingEvent',
            subjectId: event.id,
            title: event.title
          });
        });
      });
    });
});
module.exports = upcomingEvent;


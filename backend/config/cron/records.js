const cron = require("node-cron");
const dateFormat = require("dateformat");
const WalkingEvent = require("../../api/models/WalkingEvent");
const Location = require("../../api/models/Location");
const Attendee = require("../../api/models/Attendee");
const time = require("../../api/utils/datechecker");
const WalkingRecord = require("../../api/models/WalkingRecord");
const Notification = require("../../api/models/Notification");

const rejectEmails = ["cokan@ualberta.ca", "beate@gmail.com"];

// cron job check for events to delete every hour
const task = () =>
  cron.schedule("* * * * *", () => {
    // vars
    let completedEvent = 0;
    let recordsMade = 0;
    let notificationsMade = 0;

    // const
    const today = dateFormat(new Date(), "ddd, mmm d");
    const now = dateFormat(new Date(), "hh:MM tt");

    // query
    WalkingEvent.findAll({
      where: { date: today, completed: false },
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
        console.log(
          "Executing cron job: " + time(now.toString(), event.start_time)
        );
        console.log(event.id + "this is our ID of the prev event");
        if (time(now, event.start_time)) {
          event.attendees.map(person => {
            // attendees
            if (!rejectEmails.includes(person.email)) {
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
                long: event.location.long,
                lat: event.location.lat,
                total_attendees: event.total_attendees,
                distance: null,
                duration: null,
                intensity: null,
                walk_rating: null,
                walk_rating_comment: null,
                location_rating: null,
                location_rating_comment: null,
                completed: 0,
                walkingId: event.id
              });

              // Send notification to event attendees
              event.attendees.map(attendee => {
                Notification.create({
                  email: attendee.email,
                  isRead: 0,
                  type: "eventRecord",
                  subjectId: event.id,
                  title: event.title
                });
              });
              recordsMade = recordsMade + 1;
              notificationsMade = notificationsMade + 1;
            }
          });

          // event organizer
          if (!rejectEmails.includes(event.email)) {
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
              lat: event.location.lat,
              long: event.location.long,
              total_attendees: event.total_attendees,
              distance: null,
              duration: null,
              intensity: null,
              walk_rating: null,
              walk_rating_comment: null,
              location_rating: null,
              location_rating_comment: null,
              completed: 0,
              walkingId: event.id
            });

            // Send notification to event organizer
            Notification.create({
              email: event.email,
              isRead: 0,
              type: "eventRecord",
              subjectId: event.id,
              title: event.title
            });
            recordsMade = recordsMade + 1;
            notificationsMade = notificationsMade + 1;
          }
          WalkingEvent.update(
            {
              completed: true
            },
            {
              where: {
                id: event.id
              }
            }
          );
          completedEvent = completedEvent + 1;
          console.log(
            "Total of  " + completedEvent + " walking events were completed"
          );
          console.log(
            "Made a total of  " +
              recordsMade +
              " walking records to be filled in"
          );
          console.log(
            "Made a total of " + notificationsMade + " notifications!"
          );
        }
      });
    });
  });

module.exports = task;

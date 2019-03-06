const WalkingEvent = require("../models/WalkingEvent");
const Attendee = require("../models/Attendee");
const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const WalkingEventController = () => {
  const create = async (req, res) => {
    const { body } = req;
    console.log(body.attendees);

    WalkingEvent.hasMany(Attendee);

    try {
      WalkingEvent.create(
        {
          organizer: body.organizer,
          title: body.title,
          description: body.description,
          date: body.date,
          start_time: body.start_time,
          end_time: body.end_time,
          intensity: body.intensity,
          vanue: body.venue,
          location: body.location,
          attendees: body.attendees
        },
        {
          include: [Attendee]
        }
      );

      return res
        .status(200)
        .json({ msg: "Successfully added a walking event!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const getAll = async (req, res) => {
    try {
      const events = await WalkingEvent.findAll({
        include: [
          {
            model: Attendee
          }
        ]
      });
      return res.status(200).json({ events });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  return {
    create,
    getAll
  };
};

module.exports = WalkingEventController;

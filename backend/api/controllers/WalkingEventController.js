const WalkingEvent = require("../models/WalkingEvent");
const Attendee = require("../models/Attendee");

// WalkingEvent dontroller
const WalkingEventController = () => {
  // Create a new walkingevent
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
      console.log("reee");
      console.log(body.attendees);

      return res
        .status(200)
        .json({ msg: "Successfully added a walking event!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // Get all walkingevents
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

  // Update an event
  const updateEvent = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.title, body.description);
    await WalkingEvent.update(
      { title: body.title, description: body.description },
      { returning: true, where: { id: body.id } }
    )
      .then(self => {
        return res.status(200).json({ self });
      })
      .catch(function(err) {
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  return {
    create,
    getAll,
    updateEvent
  };
};

module.exports = WalkingEventController;

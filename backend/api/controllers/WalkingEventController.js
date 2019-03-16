const WalkingEvent = require("../models/WalkingEvent");
const Attendee = require("../models/Attendee");
const Location = require("../models/Location");

// WalkingEvent controller
const WalkingEventController = () => {
  // create a new walkingevent
  const create = async (req, res) => {
    const { body } = req;
    console.log(body.attendees);
    console.log(body.location);

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
          venue: body.venue,
          location: body.location
        },
        {
          include: [
            {
              model: Location
            }
          ]
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

  // get all walkingevents
  const getAll = async (req, res) => {
    try {
      const events = await WalkingEvent.findAll({
        include: [
          {
            model: Attendee
          },
          {
            model: Location
          }
        ]
      });
      return res.status(200).json({ events });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // update an event THIS SHIT WILL NEED TO BE FIXED LATER CUZ OF LOCATIONS
  const updateEvent = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.title, body.description);
    await WalkingEvent.update(
      {
        organizer: body.organizer,
        title: body.title,
        description: body.description,
        date: body.date,
        start_time: body.start_time,
        end_time: body.end_time,
        intensity: body.intensity,
        venue: body.venue,
        location: body.location,
        attendees: body.attendees
      },
      { returning: true, where: { id: body.id } }
    )
      .then(self => {
        return res.status(200).json({ self });
      })
      .catch(function(err) {
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  // delete a walking event
  const destroy = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    WalkingEvent.destroy({
      where: {
        id: id
      },
      include: [Attendee, Location],
      truncate: true
    })
      .then(rowDeleted => {
        if (rowDeleted == 1) {
          return res.status(200).json({ msg: "Deleted!" });
        } else {
          return res.status(404).json({ msg: "Unable to delete!" });
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" });
      });
  };

  // add an attendee to an event!
  const getEvent = async (req, res) => {
    const { id } = req.params;
    try {
      const walkingevent = await WalkingEvent.findByPk(id, {
        include: [Attendee, Location]
      });
      return res.status(200).json({ walkingevent });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  return {
    create,
    getAll,
    updateEvent,
    destroy,
    getEvent
  };
};

module.exports = WalkingEventController;

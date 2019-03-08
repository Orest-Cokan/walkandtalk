const WalkingEvent = require("../models/WalkingEvent");
const Attendee = require("../models/Attendee");

// WalkingEvent controller
const WalkingEventController = () => {
  // create a new walkingevent
  const create = async (req, res) => {
    const { body } = req;
    console.log(body.attendees);
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

  // get all walkingevents
  const getAll = async (req, res) => {
    WalkingEvent.hasMany(Attendee);

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

  // update an event
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

  // delete a walking event
  const destroy = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await WalkingEvent.destroy({
      where: {
        id: id
      }
    })
      .then(rowDeleted => {
        if (rowDeleted == 1) {
          return res.status(200).json({ msg: "Deleted!" });
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ msg: "Unable to delete!" });
      });
  };

  // update an event
  const addAttendees = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.name);
    try {
      const walkingevent = await WalkingEvent.findAll({
        where: {
          id: body.id
        },
        include: [
          {
            model: Attendee
          }
        ]
      });
      console.log(walkingevent.attendees);
      const user = Attendee.create({
        name: body.name
      });
      walkingevent.addAttendee(user);
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
    addAttendees
  };
};

module.exports = WalkingEventController;

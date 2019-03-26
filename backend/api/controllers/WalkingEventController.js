const WalkingEvent = require("../models/WalkingEvent");
const Attendee = require("../models/Attendee");
const Location = require("../models/Location");

// WalkingEvent controller
const WalkingEventController = () => {
  // create a new walkingevent
  const create = async (req, res) => {
    const { body } = req;
    WalkingEvent.create(
      {
        organizer: body.organizer,
        email: body.email,
        title: body.title,
        description: body.description,
        date: body.date,
        start_time: body.start_time,
        end_time: body.end_time,
        intensity: body.intensity,
        venue: body.venue,
        location: body.location,
        total_attendees: 1
      },
      {
        include: [
          {
            model: Location
          }
        ]
      }
    )
      .then(() => {
        return res
          .status(200)
          .json({ msg: "Successfully added a walking event!" });
      })
      .catch(err => {
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  // get all walkingevents
  const getAll = async (req, res) => {
    await WalkingEvent.findAll({
      include: [
        {
          model: Attendee
        },
        {
          model: Location
        }
      ]
    })
      .then(events => {
        return res.status(200).json({ events });
      })
      .catch(err => {
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  // update an event
  const updateEvent = async (req, res) => {
    const { body } = req;
    await WalkingEvent.update(
      {
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
        return res.status(200).json(self[1]);
      })
      .catch(function(err) {
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  // delete a walking event
  const destroy = async (req, res) => {
    const { id } = req.params;
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

  // get a walkingevent!
  const getEvent = async (req, res) => {
    const { id } = req.params;
    await WalkingEvent.findByPk(id, {
      include: [Attendee, Location]
    })
      .then(walkingevent => {
        return res.status(200).json({ walkingevent });
      })
      .catch(err => {
        return res.status(500).json({ msg: "Internal server error", err: err });
      });
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

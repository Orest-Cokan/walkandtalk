const PastEvent = require("../models/PastEvent");
const Attendee = require("../models/Attendee");
const Location = require("../models/Location");

// PastEvent controller
const PastEventController = () => {
  // create a past event
  const create = async (req, res) => {
    const { body } = req;
    console.log(body.attendees);
    console.log(body.location);

    try {
      PastEvent.create(
        {
          id: body.id;
          organizer: body.organizer,
          title: body.title,
          description: body.description,
          date: body.date,
          start_time: body.start_time,
          end_time: body.end_time,
          location: body.location,
          attendees: body.attendees,
          duration: body.duration,
          distance: body.distance,
          intensity: body.intensity,
          venue: body.venue,
          walk_rating: body.walk_rating,
          walk_rating_comment: body.walk_rating_comment,
          location_rating: body.location_rating,
          location_rating_comment: body.location_rating_comment,
        },
      );
      return res
        .status(200)
        .json({ msg: "Successfully added a past event!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // get all past events
  const getAllPastEvents = async (req, res) => {
    try {
      const events = await PastEvent.findAll();
      return res.status(200).json({ events });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };


  // get all past events for a single user
  const getUserPastEvents = async (req, res) => {
    const { email } = req.params;
    try {
      const pastevents = await PastEvent.findAll({ where: { email: email } });
      return res.status(200).json({ pastevents });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // update a past event (when records get submitted)
  const updatePastEvent = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.title, body.description);
    await WalkingEvent.update(
      {
        id: body.id;
        organizer: body.organizer,
        title: body.title,
        description: body.description,
        date: body.date,
        start_time: body.start_time,
        end_time: body.end_time,
        location: body.location,
        attendees: body.attendees,
        duration: body.duration,
        distance: body.distance,
        intensity: body.intensity,
        venue: body.venue,
        walk_rating: body.walk_rating,
        walk_rating_comment: body.walk_rating_comment,
        location_rating: body.location_rating,
        location_rating_comment: body.location_rating_comment,
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

  // get past event with id
  const getPastEvent = async (req, res) => {
    const { id } = req.params;
    try {
      const pastevent = await PastEvent.findByPk(id);
      return res.status(200).json({ pastevent });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  return {
    create,
    getAllPastEvents,
    getUserPastEvents,
    updatePastEvent,
    getPastEvent
  };
};

module.exports = PastEventController;

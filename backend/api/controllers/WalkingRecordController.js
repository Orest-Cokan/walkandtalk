const WalkingRecord = require("../models/WalkingRecord");
const Notification = require("../models/Notification");
const WalkingEvent = require("../models/WalkingEvent");
const Review = require("../models/Review");

// walking record controller
const WalkingRecordController = () => {
  // create a new walkingrecord, this should never be called by frontend!!!
  const create = async (req, res) => {
    const { body } = req;
    try {
      WalkingRecord.create(
        {
          organizer: body.organizer,
          fullname: body.organizer,
          title: body.title,
          email: body.email,
          venue: body.venue,
          date: body.date,
          location: body.location.streetName,
          lat: body.location.lat,
          long: body.location.long,
          start_time: body.start_time,
          end_time: body.end_time,
          distance: body.distance,
          duration: body.duration,
          intensity: body.intensity,
          walk_rating: body.walk_rating,
          walk_rating_comment: body.walk_rating_comment,
          location_rating: body.location_rating,
          location_rating_comment: body.location_rating_comment,
          completed: body.completed,
          total_attendees: body.total_attendees,
          walkingId: body.walkingId
        },
        {
          include: [
            {
              model: Notification
            }
          ]
        }
      );

      return res
        .status(200)
        .json({ msg: "Successfully added a created a walking record!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // get all walkingRecords
  const getAll = async (req, res) => {
    try {
      const records = await WalkingRecord.findAll();
      return res.status(200).json({ records });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // get records for a single user
  const getRecords = async (req, res) => {
    const { email } = req.params;
    try {
      const records = await WalkingRecord.findAll({
        where: { email: email }
      });
      return res.status(200).json({ records });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // get completed records for a single user
  const completedRecords = async (req, res) => {
    const { email } = req.params;
    try {
      const records = await WalkingRecord.findAll({
        where: { email: email, completed: 1 }
      });
      return res.status(200).json({ records });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // get uncompleted records for a single user
  const uncompletedRecords = async (req, res) => {
    const { email } = req.params;
    try {
      const records = await WalkingRecord.findAll({
        where: { email: email, completed: 0 }
      });
      return res.status(200).json({ records });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // update record
  const update = async (req, res) => {
    const { body } = req;
    const walkingevent = await WalkingEvent.findByPk(body.walkingId, {
      include: [Review]
    });
    console.log(walkingevent.title + "make sure we have the walking event");

    WalkingRecord.update(
      {
        duration: body.duration,
        distance: body.distance,
        intensity: body.intensity,
        venue: body.venue,
        walk_rating: body.walk_rating,
        walk_rating_comment: body.walk_rating_comment,
        location_rating: body.location_rating,
        location_rating_comment: body.location_rating_comment,
        completed: body.completed
      },
      { where: { email: body.email, id: body.id } }
    )
      .then(self => {
        Review.create({
          location_comment: body.walk_rating_comment,
          location_rating: body.location_rating
        }).then(resp => {
          walkingevent.addReviews(resp);
        });
        return res
          .status(200)
          .json({ msg: "Succesfully updated the Walking Record!" });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  return {
    create,
    getAll,
    getRecords,
    completedRecords,
    uncompletedRecords,
    update
  };
};

module.exports = WalkingRecordController;

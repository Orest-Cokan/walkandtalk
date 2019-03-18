const WalkingRecord = require("../models/WalkingRecord");

// walking record controller
const WalkingRecordController = () => {
  // create a new walkingrecord
  const create = async (req, res) => {
    const { body } = req;
    console.log(body.email);
    try {
      WalkingRecord.create({
        organizer: body.organizer,
        fullname: body.organizer,
        title: body.title,
        email: body.email,
        venue: body.venue,
        distance: body.distance,
        duration: body.duration,
        intensity: body.intesity,
        walk_rating: body.walk_rating,
        walk_rating_comment: body.walk_rating_comment,
        location_rating: body.location_rating,
        location_rating_comment: body.location_rating_comment,
        completed: body.completed
      });

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
      console.log(records);
      return res.status(200).json({ records });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // get completed records for a single user
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
      { returning: true, where: { email: body.email } }
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
    getRecords,
    completedRecords,
    uncompletedRecords,
    update
  };
};

module.exports = WalkingRecordController;

const WalkingRecord = require("../models/WalkingRecord");

// overarching walking record controller
const WalkingRecordController = () => {
  // create a new walkingrecord
  const create = async (req, res) => {
    const { body } = req;
    console.log(body.email);
    try {
      WalkingRecord.create({
        fullanem: body.fullname,
        email: body.email,
        commentsLocation: body.commentsLocation,
        commentsWalk: body.commentsWalk,
        walkRating: body.walkRating,
        locationRating: body.locationRating
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
      const records = await WalkingRecord.findAll({ where: { email: email } });
      return res.status(200).json({ records });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  return {
    create,
    getAll,
    getRecords
  };
};

module.exports = WalkingRecordController;

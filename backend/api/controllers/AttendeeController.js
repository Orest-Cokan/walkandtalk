const Attendee = require("../models/Attendee");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");

// User controller
const AttendeeController = () => {
  // update a user
  const add = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.fullname);
    await User.update(
      { fullname: body.fullname },
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
    add
  };
};

module.exports = AttendeeController;

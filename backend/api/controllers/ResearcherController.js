const User = require("../models/User");

// Researcher controller
const ResearcherController = () => {
  // Accept a user -> turn regsitered value from 0 to 1
  // in the future add email memes here
  const acceptUser = async (req, res) => {
    const { body } = req;
    await User.update(
      {
        registered: 1
      },
      { returning: true, where: { email: body.email } }
    )
      .then(self => {
        console.log("we get here???");
        return res.status(200).json(self[1]);
      })
      .catch(err => {
        return res.status(500).json({ msg: "Error updating a user" });
      });
  };

  // Deny a user -> destroy the user and remove from db (returns 1 if successful or 0 if didn't denyUser)
  // in the future add email memes
  const denyUser = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.fullname);
    await User.destroy({ truncate: true, where: { email: body.email } })
      .then(rowsRemoved => {
        if (rowsRemoved == 1) {
          return res.status(200).json({
            msg: "Succesfully removed the user by the email of " + body.email,
            removed: rowsRemoved
          });
        } else {
          return res.status(404).json({ msg: "Unable to delete user!" });
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  return {
    acceptUser,
    denyUser
  };
};

module.exports = ResearcherController;

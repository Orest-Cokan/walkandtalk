const User = require("../models/User");
const Preference = require("../models/Preference");
const Redcap = require("../models/Redcap");
const transporter = require("../utils/email/email");
const acceptEmail = require("../Utils/email/msgs/acceptUser");
const declineEmail = require("../Utils/email/msgs/declineUser");

// Researcher controller
const ResearcherController = () => {
  // Accept a user -> turn regsitered value from 0 to 1
  const acceptUser = async (req, res) => {
    const { body } = req;
    await User.update(
      {
        registered: 1
      },
      { returning: true, where: { email: body.email } }
    )
      .then(
        Redcap.update(
          {
            id: body.redcapID,
            notify: true,
            date: new Date().toISOString().split("T")[0]
          },
          { returning: true, where: { userEmail: body.email } }
        )
      )
      .then(self => {
        transporter.sendMail(acceptEmail(body.email));
        return res.status(200).json(self[1]);
      })
      .catch(err => {
        return res.status(500).json({ msg: "Error accepting a user" });
      });
  };

  // Deny a user -> destroy the user and remove from db (returns 1 if successful or 0 if didn't denyUser)
  const denyUser = async (req, res) => {
    const { body } = req;
    await User.destroy({ where: { email: body.email } })
      .then(rowsRemoved => {
        if (rowsRemoved == 1) {
          transporter.sendMail(declineEmail(body.email));
          return res.status(200).json({
            msg: "Succesfully removed the user by the email of " + body.email,
            removed: rowsRemoved
          });
        } else {
          return res.status(404).json({ msg: "Unable to delete user!" });
        }
      })
      .catch(err => {
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  // get unregistered users
  const getUnregisteredUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        where: { registered: 0 },
        include: [Preference]
      });

      return res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // get registered users
  const getRegisteredUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        where: { registered: 1 },
        include: [Preference]
      });

      return res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  return {
    acceptUser,
    denyUser,
    getUnregisteredUsers,
    getRegisteredUsers
  };
};

module.exports = ResearcherController;

const User = require("../models/User");
const Preference = require("../models/Preference");
const Picture = require("../models/Picture");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const Transporter = require("../utils/email/email");
const newUserEmail = require("../utils/email/msgs/newUser");

// User controller
const UserController = () => {
  // register a new user
  const register = async (req, res) => {
    const { body } = req;

    if (body.password === body.password2) {
      try {
        const user = await User.create(
          {
            email: body.email,
            fullname: body.fullname,
            password: body.password,
            menopausal_stage: body.menopausal_stage,
            dob: body.dob,
            registered: body.registered,
            redcapID: null,
            preference: body.preference,
            picture: body.picture
          },
          {
            include: [Preference, Picture]
          }
        );
        const token = authService().issue({ id: user.id });
        Transporter.sendMail(newUserEmail);
        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
      }
    }

    return res.status(400).json({ msg: "Bad Request: Passwords don't match" });
  };

  // login a user
  const login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const user = await User.findOne({
          where: {
            email
          }
        });

        if (!user) {
          return res.status(400).json({ msg: "Bad Request: User not found" });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });

          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: "Unauthorized" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
      }
    }

    return res
      .status(400)
      .json({ msg: "Bad Request: Email or password is wrong" });
  };

  // validate a user
  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, err => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: "Invalid Token!" });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  // get all users
  const getAll = async (req, res) => {
    try {
      const users = await User.findAll({
        include: [Preference, Picture]
      });

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // get a single user
  const getUser = async (req, res) => {
    console.log("WTF REEEEE");
    const { email } = req.params;
    console.log(email);
    try {
      const user = await User.findAll({
        where: { email: email },
        include: [Preference, Picture]
      });
      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // update a user
  const updateUser = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.fullname), "we are here!";
    console.log(body.preference, "IS THIS TRIGGERED!!!!!!");

    await User.update(
      {
        fullname: body.fullname,
        menopausal_stage: body.menopausal_stage,
        dob: body.dob,
        distance: body.preference
      },
      {
        returning: true,
        where: { email: body.email }
      }
    )
      .then(() => {
        Preference.update(
          {
            distance: body.preference.distance,
            duration: body.preference.duration,
            intensity: body.preference.intensity,
            venue: body.preference.venue,
            location: body.preference.location
          },
          {
            plain: true,
            returning: true,
            where: { userEmail: body.email }
          }
        ).then(self => {
          console.log("we get here???");
          return res.status(200).json(self[1]);
        });
      })
      .catch(function(err) {
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  return {
    register,
    login,
    validate,
    getAll,
    getUser,
    updateUser
  };
};

module.exports = UserController;

const User = require("../models/User");
const Preference = require("../models/Preference");
const Picture = require("../models/Picture");
const Redcap = require("../models/Redcap");
const authService = require("../services/auth.service");
const userPolicy = require("../policies/user.policy");
const bcryptService = require("../services/bcrypt.service");
const Transporter = require("../utils/email/email");
const newUserEmail = require("../utils/email/msgs/newUser");
const password = require("../utils/email/msgs/password");

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
            picture: body.picture,
            dob: body.dob,
            preference: body.preference,
            redcap: body.redcap,
            registered: 0,
            researcher: 0
          },
          {
            include: [Preference, Picture, Redcap]
          }
        );
        const token = authService().issue({ email: user.email });
        Transporter.sendMail(newUserEmail);
        return res.status(200).json({ user, token });
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
          },
          include: [Preference, Picture, Redcap]
        });

        if (!user) {
          return res.status(202).json({ msg: "Bad Request: User not found" });
        }

        if (
          bcryptService().comparePassword(password, user.password) &&
          userPolicy(user.registered)
        ) {
          const token = authService().issue({ email: user.email });
          return res.status(200).json({ user, token });
        } else if (
          bcryptService().comparePassword(password, user.password) &&
          !userPolicy(user.registered)
        ) {
          return res.status(203).json({ msg: "User is not registered!" });
        } else {
          return res.status(201).json({ msg: "Unauthorized" });
        }
      } catch (err) {
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
        include: [Preference, Picture, Redcap]
      });

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // get a single user
  const getUser = async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findByPk(email, {
        include: [Preference, Picture, Redcap]
      });
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // update a user
  const updateUser = async (req, res) => {
    const { body } = req;

    await User.update(
      {
        fullname: body.fullname,
        menopausal_stage: body.menopausal_stage,
        dob: body.dob
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
        )
          .then(self => {
            return res.status(200).json(self[1]);
          })
          .catch(err => {
            return res.status(500).json({ msg: "Internal server error" });
          });
      })
      .catch(err => {
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  // emails users their password to their account
  const requestPassword = async (req, res) => {
    const { email } = req.body;
    console.log("What are these values: " + email);
    try {
      const user = await User.findOne({
        where: {
          email
        }
      });
      Transporter.sendMail(password(email, user.password));
      return res.status(200).json({ msg: "Success" });
    } catch (err) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  return {
    register,
    login,
    validate,
    getAll,
    getUser,
    updateUser,
    requestPassword
  };
};

module.exports = UserController;

const User = require("../models/User");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");

// User controller
const UserController = () => {
  // register a new user
  const register = async (req, res) => {
    const { body } = req;

    if (body.password === body.password2) {
      try {
        const user = await User.create({
          email: body.email,
          fullname: body.fullname,
          password: body.password,
          menopausal_stage: body.menopausal_stage,
          intensity: body.intensity,
          venue: body.venue,
          location: body.location
        });
        const token = authService().issue({ id: user.id });

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

  // validate  auser
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
      const users = await User.findAll();

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
      const user = await User.findAll({ where: { email: email } });
      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // update a user
  const updateUser = async (req, res) => {
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

  /* Project.update(
  { title: 'a very different title now' },
  { where: { _id: 1 } }
)
  .then(result =>
    handleResult(result)
  )
  .catch(err =>
    handleError(err)
  )*/

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

const User = require("../../api/models/User");

module.exports = async (req, res, next) => {
  const email = req.body.email;
  if (email != null) {
    // do some verification stuff
    console.log(email, "hmm??");
    try {
      const user = await User.findOne({
        where: {
          email
        }
      });
      console.log(user, "is this a user????");
      console.log(user.researcher, "is this anything");
      if (user.researcher == true) {
        return next();
      }
    } catch (err) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  }

  return res.status(401).json({ msg: "Unauthorized" });
};

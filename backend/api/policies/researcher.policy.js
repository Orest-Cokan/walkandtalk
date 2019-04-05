const User = require("../../api/models/User");

module.exports = async (req, res, next) => {
  const email = req.query.email;
  console.log(email, "what is this email");
  if (email != null) {
    // do some verification stuff
    try {
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      if (user.researcher == true) {
        return next();
      }
    } catch (err) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  }
  return res.status(401).json({ msg: "Unauthorized" });
};

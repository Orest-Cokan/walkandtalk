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
      if (user.researcher == true) {
        return next();
      }
    } catch (err) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  }

  return res.status(401).json({ msg: "Unauthorized" });
};

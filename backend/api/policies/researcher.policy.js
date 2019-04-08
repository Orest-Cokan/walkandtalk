const User = require("../../api/models/User");
const JWTService = require("../services/auth.service");

// usually: "Authorization: Bearer [token]" or "token: [token]"
module.exports = async (req, res, next) => {
  let tokenToVerify;
  const email = req.query.email;

  if (req.header("Authorization")) {
    const parts = req.header("Authorization").split(" ");

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res
          .status(401)
          .json({ msg: "Format for Authorization: Bearer [token]" });
      }
    } else {
      return res
        .status(401)
        .json({ msg: "Format for Authorization: Bearer [token]" });
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ msg: "No Authorization was found" });
  }

  return JWTService().verify(tokenToVerify, async (err, thisToken) => {
    if (err) return res.status(401).json({ err });
    req.token = thisToken;
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
  });
};

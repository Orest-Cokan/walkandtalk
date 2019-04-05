const User = require("../models/User");

module.exports = (req, res, next) => {
    if(req.body.email != null) {
      // do some verification stuff
      const user = await User.findByPk(email);
      if(user.researcher === true){
          return next();
      }
      return res.status(401).json({ msg: 'Unauthorized' });
    }
  
    return res.status(401).json({ msg: 'Unauthorized' });
  };
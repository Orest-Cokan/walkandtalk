const dateFormat = require("dateformat");
const Redcap = require("../models/Redcap");
// Redcap controller
const RedcapController = () => {
  // add update redcap association of a user
  const updateUser = async (req, res) => {
    const { email } = req.params;
    const redcapUser = await Redcap.findOne({
      where: { userEmail: email }
    });
    const now = new Date();
    const date = dateFormat(
      new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
      "yyyy-mm-dd"
    );
    redcapUser
      .update({
        notify: false,
        date: date.toString()
      })
      .then(resp => {
        return res
          .status(200)
          .json({ msg: "Succesfully updated redcap information!" });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  return {
    updateUser
  };
};

module.exports = RedcapController;

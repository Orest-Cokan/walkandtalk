const User = require("../models/User");
const Picture = require("../models/Picture");
// Picture Controllers
const PictureController = () => {
  const updateImage = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.email);
    try {
      const user = await User.findByPk(body.email, {
        include: [Picture]
      });
      console.log(user, "this is our user!");
      await Picture.create({
        image: body.image
      }).then(resp => {
        console.log(resp), user.setPicture(resp);
      });
      return res
        .status(200)
        .json({ msg: "Succesfully added a picture to the user!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  return {
    updateImage
  };
};

// export the picturecontroller
module.exports = PictureController;

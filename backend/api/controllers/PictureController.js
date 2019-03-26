const User = require("../models/User");
const Picture = require("../models/Picture");
// Picture Controllers
const PictureController = () => {
  // update an image
  const updateImage = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.email);
    try {
      const user = await User.findByPk(body.email, {
        include: [Picture]
      });
      console.log(user, "this is our user!");
      console.log(body.image, "do we even get an image?");
      await Picture.create({
        image: body.image
      }).then(resp => {
        console.log(resp);
        user.setPicture(resp);
      });
      return res
        .status(200)
        .json({ msg: "Succesfully added a picture to the user!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  // get image of user
  const getImage = async (req, res) => {
    const { email } = req.params;
    console.log(email);
    try {
      await Picture.findOne({where: {userEmail: email}}).then(image => {
        return res.status(200).json(image);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  return {
    updateImage,
    getImage
  };
};

// export the picturecontroller
module.exports = PictureController;

const User = require("../../api/models/User");
const Redcap = require("../../api/models/Redcap");
const Preference = require("../../api/models/Preference");
const Picture = require("../../api/models/Picture");

const initialize = () =>
  User.create(
    {
      fullname: "Beate ",
      email: "Beate@gmail.com",
      password: "password1",
      password2: "password1",
      dob: "2020-10-10",
      menopausal_stage: "peri",
      registered: 1,
      researcher: 1,
      preference: {
        intensity: "initial",
        venue: "initial",
        distance: 0,
        duration: 0,
        location: "initial"
      },
      picture: {}
    },
    {
      include: [Preference, Picture, Redcap]
    }
  );

module.exports = initialize;

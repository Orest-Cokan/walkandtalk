const User = require("../../api/models/User");
const Redcap = require("../../api/models/Redcap");
const Preference = require("../../api/models/Preference");
const Picture = require("../../api/models/Picture");

const names = [
  "Beate",
  "XXXX",
  "Researcher 1",
  "Researcher 2",
  "Researcher 3",
  "Researcher 4",
  "Researcher 5",
  "Researcher 6"
];
const email = [
  "Beate@gmail.com",
  "XXXX@gmail.com",
  "Researcher1@gmail.com",
  "Researcher2@gmail.com",
  "Researcher3@gmail.com",
  "Researche4@gmail.com",
  "Researcher5@gmail.com",
  "Researcher6@gmail.com"
];
// initialize all the required researches upon initializing the DB.
const initializeResearchers = () =>
  User.create(
    {
      fullname: "Beate ",
      email: "Beate@gmail.com",
      password: "password1",
      password2: "password1",
      dob: "Researcher Account",
      menopausal_stage: "Researcher Account",
      registered: 1,
      researcher: 1,
      preference: {
        intensity: "Researcher Account",
        venue: "Researcher Account",
        distance: 0,
        duration: 0,
        location: "Researcher Account"
      },
      picture: {}
    },
    {
      include: [Preference, Picture, Redcap]
    }
  );

module.exports = initializeResearchers;

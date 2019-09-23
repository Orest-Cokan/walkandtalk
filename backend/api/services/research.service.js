const User = require("../../api/models/User");
const Redcap = require("../../api/models/Redcap");
const Preference = require("../../api/models/Preference");
const Picture = require("../../api/models/Picture");

const names = ["Beate Sydora", "Researcher 1"];
const email = ["cokan@ualberta.ca", "Researcher1@gmail.com"];

// initialize all the required researches upon initializing the DB.
const initializeResearchers = () => {
  names.forEach((name, index) => {
    User.create(
      {
        fullname: name,
        email: email[index],
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
  });

  User.create(
    {
      fullname: "testaccount",
      email: "testaccount@gmail.com",
      password: "password1",
      password2: "password1",
      dob: "Researcher Account",
      menopausal_stage: "Researcher Account",
      registered: 1,
      researcher: 0,
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

  User.create(
    {
      fullname: "testaccount",
      email: "testaccount101@gmail.com",
      password: "password1",
      password2: "password1",
      dob: "Researcher Account",
      menopausal_stage: "Researcher Account",
      registered: 0,
      researcher: 0,
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

  User.create(
    {
      fullname: "RS4WOMEN",
      email: "rs4women@ualberta.ca",
      password: "Walkingstudy",
      password2: "Walkingstudy",
      dob: "Researcher Account",
      menopausal_stage: "post",
      registered: 1,
      researcher: 1,
      preference: {
        intensity: "Slow",
        venue: "Indoor",
        distance: 0,
        duration: 0,
        location: "University of Alberta"
      },
      picture: {}
    },
    {
      include: [Preference, Picture, Redcap]
    }
  );
};
module.exports = initializeResearchers;

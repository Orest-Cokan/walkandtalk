const request = require("supertest");
const { beforeAction, afterAction } = require("../setup/_setup");
const User = require("../../api/models/User");

let api;
let user;
// finish this later.
beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

beforeEach(async () => {
  user = await User.build({
    fullname: "orest cokan",
    email: "martin@gmail.com",
    password: "securepassword",
    password2: "securepassword",
    dob: "1960-10-10",
    menopausal_stage: "peri",
    preference: {
      duration: 10,
      distance: 10,
      intensity: "slow",
      venue: "indoor",
      location: "riverbend"
    },
    registered: 0,
    researcher: 0
  }).save();
});

// test making a user
test("Making a user| user", async () => {
  expect(user.fullname).toBe("orest cokan");
  await user.destroy();
});

//test the accepting of a user controller
test("Accepting a user | acceptUser", async () => {
  request(api)
    .put("/public/researcher/accept")
    .set("Accept", /json/)
    .send({
      email: "martin@gmail.com",
      redcapID: 12345
    })
    .then(res => {
      expect(res.body).toBe(1);
    });
  await user.destroy();
});

// test the denying of a user controller
test("Denying a user | denyUser", async () => {
  request(api)
    .post("/public/researcher/deny")
    .set("Accept", /json/)
    .send({
      email: "martin@gmail.com"
    })
    .then(res => {
      expect(res.body.msg).toBe(
        "Succesfully removed the user by the email of martin@gmail.com"
      );
    });
  await user.destroy();
});

// get unregistered users
test("Get unregistered users | getUnregisteredUsers", async () => {
  const user2 = await User.build({
    fullname: "orest cokan",
    email: "martin12@gmail.com",
    password: "securepassword",
    password2: "securepassword",
    dob: "1960-10-10",
    menopausal_stage: "peri",
    preference: {
      duration: 10,
      distance: 10,
      intensity: "slow",
      venue: "indoor",
      location: "riverbend"
    },
    registered: 0,
    researcher: 0
  }).save();

  request(api)
    .get("/public/researcher/unregistered")
    .set("Accept", /json/)
    .send()
    .then(res => {
      console.log(res.body);
      expect(res.body.users).toHaveLength(2);
    });
  await user.destroy();
  await user2.destroy();
});

// get registered users
test("Get registered users | getRegisteredUsers", async () => {
  const user2 = await User.build({
    fullname: "orest cokan",
    email: "martin12@gmail.com",
    password: "securepassword",
    password2: "securepassword",
    dob: "1960-10-10",
    menopausal_stage: "peri",
    preference: {
      duration: 10,
      distance: 10,
      intensity: "slow",
      venue: "indoor",
      location: "riverbend"
    },
    registered: 1,
    researcher: 1
  }).save();

  const user3 = await User.build({
    fullname: "orest cokan",
    email: "martin13@gmail.com",
    password: "securepassword",
    password2: "securepassword",
    dob: "1960-10-10",
    menopausal_stage: "peri",
    preference: {
      duration: 10,
      distance: 10,
      intensity: "slow",
      venue: "indoor",
      location: "riverbend"
    },
    registered: 1,
    researcher: 1
  }).save();

  request(api)
    .get("/public/researcher/registered")
    .set("Accept", /json/)
    .send()
    .then(res => {
      console.log(res.body);
      expect(res.body.users).toHaveLength(2);
    });

  await user.destroy();
  await user2.destroy();
  await user3.destroy();
});

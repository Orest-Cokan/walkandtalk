const request = require("supertest");
const { beforeAction, afterAction } = require("../setup/_setup");
const User = require("../../api/models/User");
const Preference = require("../../api/models/Preference");

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

beforeEach(async () => {
  user = await User.build({
    fullname: "orest cokan",
    email: "martin@mail.com",
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
    }
  }).save();
});

// test creating a user
test("User | create", async () => {
  await User.destroy({ where: { email: "martin@mail.com" } });

  const res = await request(api)
    .post("/public/user")
    .set("Accept", /json/)
    .send({
      fullname: "orest cokan",
      email: "martin@mail.com",
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
    })
    .expect(200);

  expect(res.body.user).toBeTruthy();

  const user = await User.findByPk(res.body.user.email);
  expect(user.email).toBe(res.body.user.email);

  await User.destroy({ where: { email: "martin@mail.com" } });
});

// test logging in a user
test("User | login", async () => {
  const res = await request(api)
    .post("/public/login")
    .set("Accept", /json/)
    .send({
      email: "martin@mail.com",
      password: "securepassword"
    })
    .expect(200);

  expect(user).toBeTruthy();

  await User.destroy({ where: { email: "martin@mail.com" } });
});

// getting all users
test("User | get all (auth)", async () => {
  const res2 = await request(api)
    .get("/public/users")
    .set("Accept", /json/)
    .set("Authorization", `Bearer ${res.body.token}`)
    .set("Content-Type", "application/json")
    .expect(200);

  expect(res2.body.users).toBeTruthy();
  expect(res2.body.users.length).toBe(1);

  await User.destroy({ where: { email: "martin@mail.com" } });
});

// test duplicate user creation
test("User | Duplicate User", async () => {
  const res2 = await request(api)
    .post("/public/user")
    .set("Accept", /json/)
    .send({
      fullname: "orest cokan",
      email: "martin@mail.com",
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
      }
    })
    .expect(500);
  expect(res2.body.msg).toBe("Internal server error");
  await User.destroy({ where: { email: "martin@mail.com" } });
});

// test updating a user
test("User | updateUser", async () => {
  await request(api)
    .put("/public/user")
    .set("Accept", /json/)
    .send({
      fullname: "orest cokan",
      email: "martin@mail.com",
      dob: "1960-10-10",
      menopausal_stage: "peri",
      preference: {
        duration: 20,
        distance: 20,
        intensity: "fast",
        venue: "outdoor",
        location: "riverbend"
      }
    })
    .expect(200);

  await User.findOne({
    where: { email: "martin@mail.com" },
    include: [Preference]
  }).then(user => {
    console.log(user, "what value is this");
    expect(user.preference.distance).toBe(20);
    expect(user.preference.duration).toBe(20);
    expect(user.preference).toHaveLength(5);
  });
  await User.destroy({
    where: { email: "martin@mail.com" }
  });
});

// test getting a single user
test("User | getUser", async () => {
  await request(api)
    .get("/public/user/martin@mail.com")
    .set("Accept", /json/)
    .send()
    .expect(200);
  await User.destroy({ where: { email: "martin@mail.com" } });
});

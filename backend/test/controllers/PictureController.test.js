const request = require("supertest");
const { beforeAction, afterAction } = require("../setup/_setup");
const User = require("../../api/models/User");

let api;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

//mock
beforeEach(async () => {
  // make a mock user
  await request(api)
    .post("/public/user")
    .set("Accept", /json/)
    .send({
      fullname: "skryt",
      email: "dank@gmail.com",
      password: "skryt",
      password2: "skryt",
      dob: "1996-10-10",
      menopausal_stage: "peri",
      preference: {
        distance: 10,
        duration: 10,
        intensity: "slow",
        venue: "indoor",
        location: "riverbend"
      }
    })
    .expect(200);
});

// test adding a picture to a user
test("Picture | updateImage", async () => {
  // add an image to the user
  await request(api)
    .put("/public/user/picture")
    .set("Accept", /json/)
    .send({
      image: "Orest Image",
      email: "dank@gmail.com"
    })
    .expect(200);
  User.destroy({
    where: { email: "dank@gmail.com" }
  });
});

test("Picture | getImage", async () => {
  const res = await request(api)
    .get("/public/user/picture/dank@gmail.com")
    .set("Accept", /json/)
    .send();
  expect(res.body.image).toBe("Orest Image");
});

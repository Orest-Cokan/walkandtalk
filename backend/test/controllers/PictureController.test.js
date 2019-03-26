const request = require("supertest");
const { beforeAction, afterAction } = require("../setup/_setup");

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
      password2: "skryt"
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

  const DBuser = await request(api)
    .get("/public/user/dank@gmail.com")
    .set("Accept", /json/)
    .expect(200);
});

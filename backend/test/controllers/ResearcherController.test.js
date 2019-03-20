const request = require("supertest");
const { beforeAction, afterAction } = require("../setup/_setup");

let api;
// finish this later.
beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

//test the accepting of a user controller
test("Accepting a user | acceptUser", async () => {
  const res = await request(api)
    .post("/public/user")
    .set("Accept", /json/)
    .send({
      email: "martin@mail.com",
      password: "securepassword",
      password2: "securepassword",
      registered: 0
    })
    .then(
      request(api)
        .put("/public/researcher/accept")
        .set("Accept", /json/)
        .send({
          email: "martin@mail.com",
          registered: 1
        })
    )
    .then(res => {});
});

// test the denying of a user controller
test("Denying a user | denyUser", async () => {
  const res = await request(api)
    .post("/public/user")
    .set("Accept", /json/)
    .send({
      email: "martin@mail.com",
      password: "securepassword",
      password2: "securepassword",
      registered: 0
    })
    .then(
      request(api)
        .post("/public/researcher/deny")
        .set("Accept", /json/)
        .send({
          email: "martin@mail.com"
        })
    );
});

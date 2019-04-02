const { beforeAction, afterAction } = require("../setup/_setup");
const User = require("../../api/models/User");

let user;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

//mock
beforeEach(async () => {
  user = await User.build({
    fullname: "skryt cokan",
    email: "martin@mail.com",
    password: "securepassword",
    password2: "securepassword",
    dob: "2020-10-10",
    menopausal_stage: "peri",
    redcapID: 10,
    registered: 0,
    researcher: 0
  }).save();
});

// test user creation
test("User is created correctly", async () => {
  const sendUser = user.toJSON();
  // check if user is created
  expect(user.email).toBe("martin@mail.com");
  // check if password is not send to browser
  expect(sendUser.password).toBeFalsy();

  await user.destroy();
});

// test user updating
test("User is updated correctly", async () => {
  await user.update({
    fullname: "skryt cokan"
  });

  expect(user.fullname).toBe("skryt cokan");

  await user.destroy();
});

// test destroying a user
test("User is destroyed correctly", async () => {
  await user.destroy();
});

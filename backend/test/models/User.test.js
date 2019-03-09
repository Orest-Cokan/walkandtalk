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
    email: "martin@mail.com",
    password: "securepassword"
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
    email: "peter@mail.com"
  });

  expect(user.email).toBe("peter@mail.com");

  await user.destroy();
});

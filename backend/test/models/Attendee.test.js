const { beforeAction, afterAction } = require("../setup/_setup");
const Attendee = require("../../api/models/Attendee");

let attendee;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

beforeEach(async () => {
  attendee = await Attendee.build({
    name: "skryt"
  }).save();
});

test("Attendee is created correctly", async () => {
  // check if user is created
  expect(attendee.name).toBe("skryt");
  // check if password is not send to browser

  await attendee.destroy();
});

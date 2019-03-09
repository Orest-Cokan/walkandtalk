const { beforeAction, afterAction } = require("../setup/_setup");
const Attendee = require("../../api/models/Attendee");

let attendee;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

// mock
beforeEach(async () => {
  attendee = await Attendee.build({
    name: "skryt"
  }).save();
});

// test attendee
test("Attendee is created correctly", async () => {
  // check if attendee is created
  expect(attendee.name).toBe("skryt");

  await attendee.destroy();
});

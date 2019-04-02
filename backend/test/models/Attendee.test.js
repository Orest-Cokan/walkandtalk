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
    fullname: "skryt cokan",
    email: "skryt@gmail.com"
  }).save();
});

// test if creating an attendee worked
test("Attendee is created correctly", async () => {
  // check if attendee is created
  expect(attendee.fullname).toBe("skryt cokan");
  await attendee.destroy();
});

// test updating an attendee
test("Attendee is updated correctly", async () => {
  await attendee.update({
    fullname: "orest cokan",
    email: "orest@gmail.com"
  });
  expect(attendee.fullname).toBe("orest cokan");
  await attendee.destroy();
});

// test deleting an attendee
test("Attendee is destroyed correctly", async () => {
  attendee.destroy();
});

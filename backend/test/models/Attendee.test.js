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
    name: "skryt",
    email: "skryt@gmail.com"
  }).save();
});

// test if creating an attendee worked
test("Attendee is created correctly", async () => {
  // check if attendee is created
  expect(attendee.name).toBe("skryt");
  expect(attendee.email).toBe("skryt@gmail.com");
  await attendee.destroy();
});

// test updating an attendee
test("Attendee is updated correctly", async () => {
  await attendee.update({
    name: "orest cokan",
    email: "orest@gmail.com"
  });
  expect(attendee.name).toBe("orest cokan");
  expect(attendee.email).toBe("orest@gmail.com");
});

// test deleting an attendee
test("Attendee is destroyed correctly", async () => {
  attendee.destroy();
});

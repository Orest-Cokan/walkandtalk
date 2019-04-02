const { beforeAction, afterAction } = require("../setup/_setup");
const WalkingEvent = require("../../api/models/WalkingEvent");
const Attendee = require("../../api/models/Attendee");
const Location = require("../../api/models/Location");

let walkingEvent;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

// mock
beforeEach(async () => {
  walkingEvent = await WalkingEvent.build({
    title: "walking with friends",
    organizer: "orest cokan",
    email: "skryt@gmail.com",
    date: "Fri, Mar 28",
    start_time: "10:00pm",
    end_time: "11:00pm",
    description: "i want to go",
    intensity: "slow",
    venue: "indoor",
    location: {
      streetName: "riverbend",
      long: 10,
      lat: 11
    },
    total_attendees: 1
  }).save();
});

// test walkingevent creation
test("Walkingevent is created correctly", async () => {
  expect(walkingEvent.title).toBe("walking with friends");
  expect(walkingEvent.description).toBe("i want to go");
  expect(walkingEvent.intensity).toBe("slow");
  expect(walkingEvent.venue).toBe("indoor");

  await walkingEvent.destroy();
});

// test walking event is updated
test("Walking event is updated correctly", async () => {
  await walkingEvent.update({
    title: "new walking event title",
    description: "id rather noose"
  });

  expect(walkingEvent.title).toBe("new walking event title");
  expect(walkingEvent.description).toBe("id rather noose");

  await walkingEvent.destroy();
});

// test destroying a walking event
test("Walking event is destroyed correctly", async () => {
  walkingEvent.destroy();
});

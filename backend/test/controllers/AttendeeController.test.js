const request = require("supertest");
const { beforeAction, afterAction } = require("../setup/_setup");
const WalkingEvent = require("../../api/models/WalkingEvent");
const Attendee = require("../../api/models/Attendee");

let api;
let walkingEvent;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

// test adding an attendee
test("Attendee | addAttendees", async () => {
  // make a walking event
  walkingEvent = await WalkingEvent.build({
    id: 5,
    title: "walking with friends",
    description: "i want to go",
    intensity: "slow",
    venue: "indoor"
  }).save();

  // add an attendee to it
  await request(api)
    .put("/public/attendee/add")
    .set("Accept", /json/)
    .send({
      id: 5,
      name: "national womans day",
      email: "skryt@gmail.com"
    })
    .expect(200);

  walkingEvent.destroy();
});

// test removeing an attendee
test("Attendee | removeAttendees", async () => {
  // make a walking event
  walkingEvent = await WalkingEvent.build({
    id: 5,
    title: "walking with friends",
    description: "i want to go",
    intensity: "slow",
    venue: "indoor"
  }).save();

  // add an attendee to it
  await request(api)
    .put("/public/attendee/add")
    .set("Accept", /json/)
    .send({
      id: 5,
      name: "national womans day",
      email: "skryt@gmail.com"
    })
    .expect(200);

  await request(api).walkingEvent.destroy();
});

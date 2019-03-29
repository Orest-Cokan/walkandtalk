const request = require("supertest");
const { beforeAction, afterAction } = require("../setup/_setup");
const WalkingEvent = require("../../api/models/WalkingEvent");
const Location = require("../../api/models/Location");
const Attendee = require("../../api/models/Attendee");

let api;
let walkingEvent;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

//mock
beforeEach(async () => {
  walkingEvent = await WalkingEvent.build({
    id: 5,
    organizer: "orest cokan",
    title: "walking with friends",
    email: "skryt@gmail.com",
    description: "i want to go",
    intensity: "slow",
    venue: "indoor",
    start_time: "08:00pm",
    end_time: "10:00pm",
    date: "Fri, Mar 28",
    location: {
      streetName: "riverbend",
      long: 12,
      lat: 13
    },
    total_attendees: 1
  }).save();
});

// test creating a walking event
test("WalkingEvent | create", async () => {
  const walkingevent = await WalkingEvent.findById(5, {
    include: [
      {
        model: Attendee
      },
      {
        model: Location
      }
    ]
  });
  expect(walkingevent.id).toBe(5);
  expect(walkingevent.title).toBe("walking with friends");
  expect(walkingevent.description).toBe("i want to go");
  expect(walkingevent.venue).toBe("indoor");
  expect(walkingevent.intensity).toBe("slow");
  await walkingEvent.destroy();
});

// test destroying a walking event
test("WalkingEvent | destroy", async () => {
  const response = await request(api)
    .del("/public/walkingevent/5")
    .set("Accept", /json/)
    .expect(200);
  expect(response.body.msg).toBe("Deleted!");

  await walkingEvent.destroy();
});

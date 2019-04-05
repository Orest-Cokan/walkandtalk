const request = require("supertest");
const { beforeAction, afterAction } = require("../setup/_setup");
const WalkingEvent = require("../../api/models/WalkingEvent");

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
  // make a walking event
  await request(api)
    .post("/public/walkingevent")
    .set("Accept", /json/)
    .send({
      title: "walking with friends",
      email: "skryt@gmail.com",
      organizer: "skryt",
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
      }
    })
    .expect(200);
});

// test adding an attendee
test("Attendee | addAttendees", async () => {
  // add an attendee to it
  await request(api)
    .put("/public/attendee/add")
    .set("Accept", /json/)
    .send({
      id: 1,
      fullname: "national womans day",
      email: "skryt@gmail.com"
    })
    .expect(200);

  const walkingEvent = await request(api)
    .get("/public/walkingevent/1")
    .expect(200);
  const ev = JSON.parse(walkingEvent.text);
  const event = ev.walkingevent;
  expect(event.total_attendees).toBe(2);

  await request(api)
    .delete("/public/walkingevent/1")
    .expect(200);
});

// test removing an attendee
test("Attendee | removeAttendees", async () => {
  // add an attendee to it
  await request(api)
    .put("/public/attendee/add")
    .set("Accept", /json/)
    .send({
      id: 2,
      fullname: "national womans day",
      email: "skryt@gmail.com"
    })
    .expect(200);

  // request to remove the attendee
  await request(api)
    .put("/public/attendee/remove")
    .set("Accept", /json/)
    .send({
      id: 2,
      email: "skryt@gmail.com"
    })
    .expect(200);

  const walkingEvent = await request(api)
    .get("/public/walkingevent/2")
    .send()
    .expect(200);
  const ev = JSON.parse(walkingEvent.text);
  const event = ev.walkingevent;
  expect(event.total_attendees).toBe(1);

  await request(api)
    .delete("/public/walkingevent/2")
    .expect(200);
});

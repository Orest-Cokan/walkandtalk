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
      venue: "indoor"
    })
    .expect(200);
});

// test adding an attendee
test("Attendee | addAttendees", async () => {
  console.log();
  // add an attendee to it
  await request(api)
    .put("/public/attendee/add")
    .set("Accept", /json/)
    .send({
      id: 1,
      name: "national womans day",
      email: "skryt@gmail.com"
    })
    .expect(200);

  const walkingEvent = await request(api)
    .get("/public/walkingevent/1")
    .expect(200);
  //console.log(walkingEvent.text, "we are here!!!!!!");
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
      name: "national womans day",
      email: "skryt@gmail.com"
    })
    .expect(200);

  // request to remove the attendee
  await request(api)
    .get("/public/attendee/remove")
    .set("Accept", /json/)
    .send({
      id: 2,
      name: "national womans day",
      email: "skryt@gmail.com"
    })
    .expect(200);

  const walkingEvent = await request(api)
    .get("/public/walkingevent/2")
    .expect(200);
  const ev = JSON.parse(walkingEvent.text);
  console.log(ev, "remove ????");
  const event = ev.walkingevent;
  expect(event.total_attendees).toBe(1);

  await request(api)
    .delete("/public/walkingevent/1")
    .expect(200);
});

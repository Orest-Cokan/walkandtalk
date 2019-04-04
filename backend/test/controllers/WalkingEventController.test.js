const request = require("supertest");
const { beforeAction, afterAction } = require("../setup/_setup");
const WalkingEvent = require("../../api/models/WalkingEvent");
const Location = require("../../api/models/Location");
const Attendee = require("../../api/models/Attendee");

let api;
let resp;
beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

// test creating a walking event
test("WalkingEvent | create", async () => {
  await request(api)
    .post("/public/walkingevent")
    .set("Accept", /json/)
    .send({
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
      }
    })
    .expect(200);

  const walkingevent = await WalkingEvent.findByPk(1, {
    include: [
      {
        model: Attendee
      },
      {
        model: Location
      }
    ]
  });
  expect(walkingevent.id).toBe(1);
  expect(walkingevent.title).toBe("walking with friends");
  expect(walkingevent.description).toBe("i want to go");
  expect(walkingevent.venue).toBe("indoor");
  expect(walkingevent.intensity).toBe("slow");
});

// test getting all walking events - there should be 2
test("WalkingEvent | getAll", async () => {
  await request(api)
    .post("/public/walkingevent")
    .set("Accept", /json/)
    .send({
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
      }
    })
    .expect(200);
  const walkingevent = await WalkingEvent.findAll({
    include: [
      {
        model: Attendee
      },
      {
        model: Location
      }
    ]
  });
  expect(walkingevent.length).toBe(2);
});

// test destroying a walking event
test("WalkingEvent | destroy", async () => {
  const response = await request(api)
    .del("/public/walkingevent/1")
    .set("Accept", /json/)
    .expect(200);
  expect(response.body.msg).toBe("Deleted!");
});

// test destroying mutliple walking events (this was buggy in the past)
test("WalkingEvent | destroy multiple", async () => {
  let response = await request(api)
    .delete("/public/walkingevent/1")
    .set("Accept", /json/)
    .expect(200);
  expect(response.body.msg).toBe("Deleted!");

  await request(api)
    .post("/public/walkingevent")
    .set("Accept", /json/)
    .send({
      organizer: "orest cokan...",
      title: "walking with friends",
      email: "skryt12@gmail.com",
      description: "i want to go",
      intensity: "slow",
      venue: "indoor",
      start_time: "08:00pm",
      end_time: "10:00pm",
      date: "Fri, Mar 28",
      location: {
        streetName: "riverbend231",
        long: 12,
        lat: 13
      }
    })
    .expect(200);

  await request(api)
    .delete("/public/walkingevent/2")
    .set("Accept", /json/)
    .expect(200);
});

// test updating a walking event
test("WalkingEvent | update", async () => {
  await request(api)
    .put("/public/walkingevent")
    .set("Accept", /json/)
    .send({
      id: 2,
      organizer: "eleni beate",
      title: "walking with only researchers",
      description: "no cats or dogs",
      intensity: "slow",
      venue: "outdoor",
      start_time: "08:00pm",
      end_time: "10:00pm",
      date: "Fri, Mar 28",
      location: {
        streetName: "millwoods",
        long: 15,
        lat: 16
      }
    })
    .expect(200);

  const walkingevent = await WalkingEvent.findByPk(2, {
    include: [
      {
        model: Attendee
      },
      {
        model: Location
      }
    ]
  });

  expect(walkingevent.title).toBe("walking with only researchers");
  expect(walkingevent.location.streetName).toBe("millwoods");
  expect(walkingevent.location.long).toBe(15);
  expect(walkingevent.location.lat).toBe(16);
});

// test getting a single walking event
test("WalkingEvent | getEvent", async () => {
  const response = await request(api)
    .get("/public/walkingevent/2")
    .set("Accept", /json/)
    .expect(200);
  expect(response.body.walkingevent).toBeTruthy();
  expect(response.body.walkingevent.id).toBe(2);
});

// test getting a users walking event
test("WalkingEvent | getUserEvents", async () => {
  const response = await request(api)
    .get("/public/walkingevents/skryt@gmail.com")
    .set("Accept", /json/)
    .expect(200);
  console.log(response.body, "what is this meme");
  expect(response.body.events.length).toBe(1);
});

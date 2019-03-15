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

// test creating a walking event
test("WalkingEvent | create", async () => {
  walkingEvent = await WalkingEvent.build({
    id: 5,
    title: "walking with friends",
    description: "i want to go",
    intensity: "slow",
    venue: "indoor"
  }).save();

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
  console.log(walkingevent.dataValues, "REEEEEEEEEEEEEEE");
  console.log(walkingevent.location, "reeee");
  expect(walkingevent.id).toBe(5);
  expect(walkingevent.title).toBe("walking with friends");
  expect(walkingevent.description).toBe("i want to go");
  expect(walkingevent.venue).toBe("indoor");
  expect(walkingevent.intensity).toBe("slow");
  await walkingEvent.destroy();
});

// test destroying a walking event
test("WalkingEvent | destroy", async () => {
  walkingEvent = await WalkingEvent.build({
    id: 5,
    title: "walking with friends",
    description: "i want to go",
    intensity: "slow",
    venue: "indoor"
  }).save();

  console.log("wtf is going on in here!!!");
  const response = await request(api)
    .del("/public/walkingevent/5")
    .set("Accept", /json/)
    .expect(200);
  expect(response.body.msg).toBe("Deleted!");

  await walkingEvent.destroy();
});

// test adding an attendee
test("WalkingEvent | addAttendee", async () => {
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
    .put("/public/walkingevent/attendee")
    .set("Accept", /json/)
    .send({
      id: 5,
      name: "national womans day"
    })
    .expect(200);

  walkingEvent.destroy();
});

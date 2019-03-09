const request = require("supertest");
const { beforeAction, afterAction } = require("../setup/_setup");
const WalkingEvent = require("../../api/models/WalkingEvent");

let api;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

// test creating a walking event
test("WalkingEvent | create", async () => {
  const res = await request(api)
    .post("/public/walkingevent")
    .set("Accept", /json/)
    .send({
      title: "Walking Event!",
      description: "going to go walking at the U of A",
      location: "millwoods",
      venue: "outdoor",
      intensity: "fast"
    })
    .expect(200);

  expect(res.body.msg).toBe("Successfully added a walking event!");
  const walkingevent = await WalkingEvent.findById(1);
  expect(walkingevent.id).toBe(1);
  expect(walkingevent.title).toBe("Walking Event!");
  expect(walkingevent.description).toBe("going to go walking at the U of A");
  expect(walkingevent.location).toBe("millwoods");
  expect(walkingevent.venue).toBe("outdoor");
  expect(walkingevent.intensity).toBe("fast");

  await walkingevent.destroy();
});

// test destroying a walking event
test("WalkingEvent | destroy", async () => {
  const res = await request(api)
    .post("/public/walkingevent")
    .set("Accept", /json/)
    .send({
      title: "Walking Event!",
      description: "going to go walking at the U of A",
      location: "millwoods",
      venue: "indoor",
      intensity: "fast"
    })
    .expect(200);

  console.log(res.body.msg);

  const response = await request(api)
    .del("/public/walkingevent/2")
    .set("Accept", /json/)
    .expect(200);
  expect(response.body.msg).toBe("Deleted!");
});

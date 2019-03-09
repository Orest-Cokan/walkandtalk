const { beforeAction, afterAction } = require("../setup/_setup");
const WalkingEvent = require("../../api/models/WalkingEvent");

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
    description: "i want to go",
    intensity: "slow",
    location: "millwoods",
    venue: "indoor"
  }).save();
});

// test walkingevent creation
test("Walkingevent is created correctly", async () => {
  expect(walkingEvent.title).toBe("walking with friends");
  expect(walkingEvent.description).toBe("i want to go");
  expect(walkingEvent.intensity).toBe("slow");
  expect(walkingEvent.venue).toBe("indoor");
  expect(walkingEvent.location).toBe("millwoods");

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

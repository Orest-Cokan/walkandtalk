const { beforeAction, afterAction } = require("../setup/_setup");
const WalkingRecord = require("../../api/models/WalkingRecord");

let walkingRecord;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

// mock
beforeEach(async () => {
  walkingRecord = await WalkingRecord.build({
    location_rating: "this is a string lol",
    location_rating_comment: "why are we having strings for ratings?",
    walk_rating: "1",
    walk_rating_comment: "this is impressive stuff"
  }).save();
});

// test walking record
test("WalkingRecord is created correctly", async () => {
  // check if walking record is created
  expect(walkingRecord.location_rating).toBe("this is a string lol");
  expect(walkingRecord.location_rating_comment).toBe(
    "why are we having strings for ratings?"
  );
  expect(walkingRecord.walk_rating).toBe("1");
  expect(walkingRecord.walk_rating_comment).toBe("this is impressive stuff");

  // nuke the model
  await walkingRecord.destroy();
});

// test updating walking record
test("WalkingRecord is updated correctly", async () => {
  await walkingRecord.update({
    walk_rating: "10",
    walk_rating_comment: "more strings"
  });

  expect(walkingRecord.walk_rating).toBe("10");
  expect(walkingRecord.walk_rating_comment).toBe("more strings");

  walkingRecord.destroy();
});

// test destroying a walkingrecord
test("Test destroying a walking record", async () => {
  walkingRecord.destroy();
});

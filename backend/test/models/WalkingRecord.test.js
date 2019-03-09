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
    fullname: "skryt",
    commentsLocation: "i hate the rivervalley too many hobos",
    commentsWalk: "walking is not fun, 0/10 would not recommend",
    walkRating: 1,
    locationRating: 2
  }).save();
});

// test attendee
test("WalkingRecord is created correctly", async () => {
  // check if attendee is created
  expect(walkingRecord.fullname).toBe("skryt");
  expect(walkingRecord.commentsLocation).toBe(
    "i hate the rivervalley too many hobos"
  );
  expect(walkingRecord.commentsWalk).toBe(
    "walking is not fun, 0/10 would not recommend"
  );
  expect(walkingRecord.walkRating).toBe(1);
  expect(walkingRecord.locationRating).toBe(2);

  // nuke the model
  await walkingRecord.destroy();
});

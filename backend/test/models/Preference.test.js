const { beforeAction, afterAction } = require("../setup/_setup");
const Preference = require("../../api/models/Preference");

let preference;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

//mock
beforeEach(async () => {
  preference = await Preference.build({
    duration: 10,
    distance: 10,
    venue: "indoor",
    intensity: "slow",
    location: "riverbend"
  }).save();
});

// test Preference creation
test("Preference is created correctly", async () => {
  // check if Preference is created
  expect(preference.duration).toBe(10);
  expect(preference.distance).toBe(10);
  expect(preference.venue).toBe("indoor");
  expect(preference.intensity).toBe("slow");
  expect(preference.location).toBe("riverbend");

  await preference.destroy();
});

// test Preference updating
test("Preference is updated correctly", async () => {
  await preference.update({
    duration: 20,
    distance: 20,
    location: "millwoods"
  });

  expect(preference.duration).toBe(20);
  expect(preference.distance).toBe(20);
  expect(preference.location).toBe("millwoods");

  await preference.destroy();
});

// test destroying a preference
test("Preference is destroyed correctly", async () => {
  await preference.destroy();
});

// test sending in null values
test("create a preference model with null values", async () => {
  await preference.destroy();

  await Preference.create({
    duration: null,
    distance: null,
    venue: null,
    intensity: null,
    location: null
  }).catch(error => {
    expect(error).toBeTruthy();
  });
});

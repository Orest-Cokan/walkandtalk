const { beforeAction, afterAction } = require("../setup/_setup");
const Location = require("../../api/models/Location");

let location;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

//mock
beforeEach(async () => {
  location = await Location.build({
    streetName: "Citarum River",
    lat: 0.123,
    long: 0.123
  }).save();
});

// test location creation
test("Location is created correctly", async () => {
  // check if location is created
  expect(location.streetName).toBe("Citarum River");
  expect(location.lat).toBe(0.123);
  expect(location.long).toBe(0.123);

  await location.destroy();
});

// test location updating
test("Location is updated correctly", async () => {
  await location.update({
    streetName: "Discount Ivan"
  });

  expect(location.streetName).toBe("Discount Ivan");

  await location.destroy();
});

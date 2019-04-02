const { beforeAction, afterAction } = require("../setup/_setup");
const time = require("../../api/Utils/datechecker");

let time1;
let time2;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

test("10pm 11pm | time", async () => {
  time1 = "10:00pm";
  time2 = "11:00pm";

  expect(time(time1, time2)).toBe(false);
});

test("11pm 10pm | time", async () => {
  time1 = "10:00pm";
  time2 = "11:00pm";

  expect(time(time2, time1)).toBe(true);
});

test("12pm 1pm | time", async () => {
  time1 = "12:00pm";
  time2 = "01:00pm";

  expect(time(time1, time2)).toBe(false);
});

test("12pm 12pm | time", async () => {
  time1 = "12:00pm";
  time2 = "12:00pm";

  expect(time(time1, time2)).toBe(true);
});

test("11pm 1pm | time", async () => {
  time1 = "11:00pm";
  time2 = "02:00pm";

  expect(time(time1, time2)).toBe(true);
});

test("11am 1pm | time", async () => {
  time1 = "11:00am";
  time2 = "01:00pm";

  expect(time(time1, time2)).toBe(false);
});

test("10am 12pm | time", async () => {
  time1 = "10:00am";
  time2 = "12:00pm";

  expect(time(time1, time2)).toBe(false);
});

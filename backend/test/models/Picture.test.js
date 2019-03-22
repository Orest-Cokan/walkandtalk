const { beforeAction, afterAction } = require("../setup/_setup");
const Picture = require("../../api/models/Picture");

let picture;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

//mock
beforeEach(async () => {
  picture = await Picture.build({
    image: "String of Ivan Image"
  }).save();
});

// test Picture creation
test("Picture is created correctly", async () => {
  // check if Picture is created
  expect(picture.image).toBe("String of Ivan Image");
  await picture.destroy();
});

// test Picture updating
test("Picture is updated correctly", async () => {
  await picture.update({
    image: "Orest"
  });

  expect(picture.image).toBe("Orest");

  await picture.destroy();
});

const { beforeAction, afterAction } = require("../setup/_setup");
const Notification = require("../../api/models/Notification");


let notification;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

// mock
beforeEach(async () => {
  notification = await Notification.build({
    email: "u1@gmail.com",
    isRead: 0,
    type: "updatedEvent",
    subjectId: 1,
    title: "Test event"
  }).save();
});

// test notification creation
test("Notification is created correctly", async () => {
  expect(notification.email).toBe("u1@gmail.com");
  expect(notification.isRead).toBe(0);
  expect(notification.type).toBe("updatedEvent");
  expect(notification.subjectId).toBe(1);
  expect(notification.title).toBe("Test event");

  await notification.destroy();
});

// test notification is updated
test("Notification is updated correctly", async () => {
  await Notification.update(
    {
      isRead: 1
    },
    { returning: true, where: { id: notification.id } }
  )
  
  expect(notification.isRead).toBe(1);

  await notification.destroy();
});
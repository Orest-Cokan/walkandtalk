const request = require("supertest");
const { beforeAction, afterAction } = require("../setup/_setup");
const Notification = require("../../api/models/Notification");

let api;
let resp;
beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

// test creating a notification
test("Notification | create", async () => {
  await request(api)
    .post("/public/notification")
    .set("Accept", /json/)
    .send({
      email: "u1@gmail.com",
      isRead: 0,
      type: "updatedEvent",
      subjectId: 1,
      title: "Test event"
      }
    )
    .expect(200);

  const notification = await Notification.findByPk(1);
  expect(notification.id).toBe(1);
  expect(notification.email).toBe("u1@gmail.com");
  expect(notification.isRead).toBe(0);
  expect(notification.type).toBe("updatedEvent");
  expect(notification.subjectId).toBe(1);
  expect(notification.title).toBe("Test event");
});

// test updating a notification
test("Notification | update", async () => {
    await request(api)
      .put("/public/notification")
      .set("Accept", /json/)
      .send({
        id: 1,
        isRead: 1,
        }
      )
      .expect(200);
  
    const notification = await Notification.findByPk(1);
    expect(notification.isRead).toBe(1);
  });

// test getting user notifications
test("Notification | getNotifications", async () => {
  await request(api)
    .post("/public/notification")
    .set("Accept", /json/)
    .send({
        email: "u1@gmail.com",
        isRead: 0,
        type: "upcomingEvent",
        subjectId: 2,
        title: "Another test event"
        }
      )
    .expect(200);
    const notifications = await Notification.findAll({
        where: { email: email }
    });
  expect(notifications.length).toBe(2);
});

// test getting user unread notifications
test("Notification | getUnreadNotifications", async () => {
    await request(api)
      .post("/public/notification")
      .set("Accept", /json/)
      .send({
        email: "u1@gmail.com",
        isRead: 0,
        type: "cancelledEvent",
        subjectId: 3,
        title: "Cancelled event"
        }
      )
      .expect(200);
    const notifications = await Notification.findAll({
    where: { email: email, isRead: 0 }
    });
    expect(notifications.length).toBe(2);
  });
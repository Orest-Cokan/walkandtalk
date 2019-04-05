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
  // Create a user
  const user = await request(api)
    .post("/public/user")
    .set("Accept", /json/)
    .send({
      fullname: "User 1",
      email: "u1@mail.com",
      password: "password",
      password2: "password",
      dob: "Mar 04, 1965",
      menopausal_stage: "Post",
      preference: {
        duration: 10,
        distance: 10,
        intensity: "Slow",
        venue: "Outdoor",
        location: "Summerside area"
      },
    registered: 0,
    researcher: 0
    })
  .expect(200);
  // Accept user
  await request(api)
    .put("/researcher/accept", {params: {email: "Beate@gmail.com"}})
    .set("Accept", /json/)
    .send({
      userEmail: "u1@gmail.com",
      redcapID: "100"
    })
  .expect(200);
  // Make an event for the user
  await request(api)
    .put("/private/walkingevent", { headers: { Authorization: 'Bearer ' + user.token }})
    .set("Accept", /json/)
    .send({
      organizer: "User 1",
      title: "Test 1",
      email: "u1@gmail.com",
      description: "Test",
      intensity: "Slow",
      venue: "Indoor",
      start_time: "08:00am",
      end_time: "9:00pm",
      date: "Sat, Apr 6",
      location: {
        streetName: "Summerside",
        long: -113,
        lat: 54
      }
    })
    .expect(200);
  // Send notification
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
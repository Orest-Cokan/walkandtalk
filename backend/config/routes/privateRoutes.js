const privateRoutes = {
  // User routes
  "GET /user/:email": "UserController.getUser",
  "PUT /user": "UserController.updateUser",

  // Walkingevent routes
  "GET /walkingevents": "WalkingEventController.getAll",
  "POST /walkingevent": "WalkingEventController.create",
  "GET /walkingrecord/:email": "WalkingRecordController.getRecords",
  "GET /walkingevent/:id": "WalkingEventController.getEvent",
  "GET /walkingevents/:email": "WalkingEventController.getUserEvents",
  "PUT /walkingevent": "WalkingEventController.updateEvent",
  "DELETE /walkingevent/:id": "WalkingEventController.destroy",

  // Walkingrecord routes
  "GET /walkingrecord/:email": "WalkingRecordController.getRecords",
  "GET /walkingrecord/completed/:email":
    "WalkingRecordController.completedRecords",
  "GET /walkingrecord/uncompleted/:email":
    "WalkingRecordController.uncompletedRecords",
  "PUT /walkingrecord": "WalkingRecordController.update",

  // Attendee routes
  "PUT /attendee/add": "AttendeeController.addAttendees",
  "PUT /attendee/remove": "AttendeeController.removeAttendees",

  // Notification routes
  "POST /notification": "NotificationController.create",
  "PUT /notification": "NotificationController.update",
  "GET /notifications": "NotificationController.getAll", // for testing only
  "GET /notification/:email": "NotificationController.getNotifications",
  "GET /notification/unread/:email":
    "NotificationController.getUnreadNotifications",

  // Picture routes
  "PUT /user/picture": "PictureController.updateImage",
  "GET /user/picture/:email": "PictureController.getImage"
};

module.exports = privateRoutes;

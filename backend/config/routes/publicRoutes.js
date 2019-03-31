const publicRoutes = {
  // User routes
  "POST /user": "UserController.register",
  "POST /register": "UserController.register", // alias for POST /user
  "POST /login": "UserController.login",
  "POST /validate": "UserController.validate",
  "GET /users": "UserController.getAll",
  "GET /user/:email": "UserController.getUser",
  "PUT /user": "UserController.updateUser",

  // Walkingevent routes
  "GET /walkingevents": "WalkingEventController.getAll",
  "POST /walkingevent": "WalkingEventController.create",
  "GET /walkingevent/:id": "WalkingEventController.getEvent",
  "PUT /walkingevent": "WalkingEventController.updateEvent",
  "DELETE /walkingevent/:id": "WalkingEventController.destroy",

  // Walkingrecord routes
  "GET /walkingrecords": "WalkingRecordController.getAll",
  "GET /walkingrecord/:email": "WalkingRecordController.getRecords",
  "GET /walkingrecord/completed/:email":
    "WalkingRecordController.completedRecords",
  "GET /walkingrecord/uncompleted/:email":
    "WalkingRecordController.uncompletedRecords",
  "PUT /walkingrecord": "WalkingRecordController.update",

  // Researcher routes
  "PUT /researcher/accept": "ResearcherController.acceptUser",
  "POST /researcher/deny": "ResearcherController.denyUser",
  "GET /researcher/registered": "ResearcherController.getRegisteredUsers",
  "GET /researcher/unregistered": "ResearcherController.getUnregisteredUsers",

  // Attendee routes
  "PUT /attendee/add": "AttendeeController.addAttendees",
  "PUT /attendee/remove": "AttendeeController.removeAttendees",

  // Picture routes
  "PUT /user/picture": "PictureController.updateImage",
  "GET /user/picture/:email": "PictureController.getImage",

  // Notification routes
  "POST /notification": "NotificationController.create",
  "PUT /notification": "NotificationController.update",
  "GET /notifications": "NotificationController.getAll", // for testing only
  "GET /notification/:email": "NotificationController.getNotifications",

  // Excel route
  "GET /researcher/excel": "ExcelController.getData"
};

module.exports = publicRoutes;

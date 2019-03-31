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
  "GET /walkingevents/:email": "WalkingEventController.getUserEvents",
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
  "GET /attendee/remove": "AttendeeController.removeAttendees",

  // Picture routes
  "PUT /user/picture": "PictureController.updateImage",
  "GET /user/picture/:email": "PictureController.getImage",

  // Excel routes
  "GET /researcher/excel": "ExcelController.getData",

  // Redcap routes
  "PUT /redcap/:email": "RedcapController.updateUser"
};

module.exports = publicRoutes;

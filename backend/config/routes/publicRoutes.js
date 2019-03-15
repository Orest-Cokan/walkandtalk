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
  "PUT /walkingevent/attendee": "WalkingEventController.addAttendees",

  // Walkingrecord routes
  "GET /walkingrecords": "WalkingRecordController.getAll",
  "GET /walkingrecord/:email": "WalkingRecordController.getRecords",
  "POST /walkingrecord": "WalkingRecordController.create",

  // Researcher routes
  "PUT /researcher/accept": "ResearcherController.acceptUser",
  "POST /researcher/deny": "ResearcherController.denyUser"
};

module.exports = publicRoutes;

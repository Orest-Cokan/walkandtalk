const publicRoutes = {
  //User routes
  "POST /user": "UserController.register",
  "POST /register": "UserController.register", // alias for POST /user
  "POST /login": "UserController.login",
  "POST /validate": "UserController.validate",
  "GET /users": "UserController.getAll",
  "GET /user/:email": "UserController.getUser",
  "PUT /user": "UserController.updateUser",

  //Walkingevent routes
  "GET /walkingevents": "WalkingEventController.getAll",
  "POST /walkingevent": "WalkingEventController.create",
  "PUT /walkingevent": "WalkingEventController.updateEvent",
  "DELETE /walkingevent/:id": "WalkingEventController.destroy"
};

module.exports = publicRoutes;

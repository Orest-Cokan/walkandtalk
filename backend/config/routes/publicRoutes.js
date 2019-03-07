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
  "GET /walkingevent/:title": "WalkingEventController.getEvent"
};

module.exports = publicRoutes;

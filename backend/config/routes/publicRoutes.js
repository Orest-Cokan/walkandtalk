const publicRoutes = {
  // Public routes accessible by anyone

  // User routes
  "POST /user": "UserController.register",
  "POST /register": "UserController.register", // alias for POST /user
  "POST /login": "UserController.login",
  "POST /validate": "UserController.validate",

  // Redcap routes
  "PUT /redcap/:email": "RedcapController.updateUser"
};

module.exports = publicRoutes;

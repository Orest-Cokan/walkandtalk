const publicRoutes = {
  // Public routes accessible by anyone

  // User routes
  "POST /user": "UserController.register",
  "POST /register": "UserController.register", // alias for POST /user
  "POST /login": "UserController.login",
  "POST /validate": "UserController.validate",
  "POST /request": "UserController.requestPassword"
};

module.exports = publicRoutes;

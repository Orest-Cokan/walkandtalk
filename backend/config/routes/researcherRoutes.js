const researcherRoutes = {
  // Contain routes only researchers can access
  // User routes
  "GET /users": "UserController.getAll",

  // Researcher routes
  "PUT /accept": "ResearcherController.acceptUser",
  "POST /deny": "ResearcherController.denyUser",

  "GET /registered": "ResearcherController.getRegisteredUsers",
  "GET /unregistered": "ResearcherController.getUnregisteredUsers"
};

module.exports = researcherRoutes;

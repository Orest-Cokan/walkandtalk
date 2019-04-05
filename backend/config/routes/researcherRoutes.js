const researcherRoutes = {
  // Contain routes only researchers can access
  // User routes
  "GET /users": "UserController.getAll",

  // Walkingrecord routes
  "GET /walkingrecords": "WalkingRecordController.getAll",

  // Researcher routes
  "PUT /accept": "ResearcherController.acceptUser",
  "POST /deny": "ResearcherController.denyUser",

  // Excel route
  "GET /excel": "ExcelController.getData"
};

module.exports = researcherRoutes;

const researcherRoutes = {
  // Contain routes only researchers can access
  // Walkingrecord routes
  "GET /walkingrecords": "WalkingRecordController.getAll",
  "GET /walkingrecord/completed/:email":
    "WalkingRecordController.completedRecords",
  "GET /walkingrecord/uncompleted/:email":
    "WalkingRecordController.uncompletedRecords",

  // Researcher routes
  "PUT /accept": "ResearcherController.acceptUser",
  "POST /deny": "ResearcherController.denyUser",

  // Excel route
  "GET /researcher/excel": "ExcelController.getData"
};

module.exports = researcherRoutes;

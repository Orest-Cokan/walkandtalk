const privateRoutes = require("./routes/privateRoutes");
const publicRoutes = require("./routes/publicRoutes");
const researcherRoutes = require("./routes/researcherRoutes");

const config = {
  migrate: false,
  privateRoutes,
  publicRoutes,
  researcherRoutes,
  port: "2019"
};

module.exports = config;

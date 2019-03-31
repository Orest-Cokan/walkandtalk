const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "attendees";

// Attendee model
const Attendee = sequelize.define(tableName, {
  email: Sequelize.STRING,
  fullname: Sequelize.STRING
});

// export attendee model
module.exports = Attendee;

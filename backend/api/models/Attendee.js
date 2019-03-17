const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "attendees";

// Attendee model
const Attendee = sequelize.define(tableName, {
  email: Sequelize.STRING,
  submittedRecord: Sequelize.BOOLEAN
});

module.exports = Attendee;

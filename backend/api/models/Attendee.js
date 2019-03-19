const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "attendees";

// Attendee model
const Attendee = sequelize.define(tableName, {
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = Attendee;

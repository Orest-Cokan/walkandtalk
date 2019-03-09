const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "attendees";

// attendee model
const Attendee = sequelize.define(tableName, {
  name: Sequelize.STRING
});

module.exports = Attendee;

const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "attendees";

// attendee model
const Attendee = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = Attendee;

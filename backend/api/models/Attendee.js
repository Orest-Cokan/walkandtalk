const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "attendees";

// Attendee model
const Attendee = sequelize.define(tableName, {
  email: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING
});

// export attendee model
module.exports = Attendee;

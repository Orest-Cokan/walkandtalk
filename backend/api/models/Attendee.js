const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "Attendees";

const Attendee = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = Attendee;

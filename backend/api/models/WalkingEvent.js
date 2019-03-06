const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "WalkingEvent";

const Attendee = sequelize.define("attendee", {
  name: Sequelize.STRING
});

const WalkingEvent = sequelize.define(tableName, {
  organizer: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  date: Sequelize.STRING,
  start_time: Sequelize.STRING,
  end_time: Sequelize.STRING,
  intensity: Sequelize.STRING,
  venue: Sequelize.STRING,
  location: Sequelize.STRING
});

WalkingEvent.hasMany(Attendee);

module.exports = WalkingEvent;

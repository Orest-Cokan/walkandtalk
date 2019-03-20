const Sequelize = require("sequelize");
const sequelize = require("../../config/database");
const WalkingEvent = require("./WalkingEvent");

// table name
const tableName = "walkingrecords";

// walking record model
const WalkingRecord = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  location: Sequelize.STRING,
  distance: Sequelize.INTEGER,
  duration: Sequelize.INTEGER,
  intensity: Sequelize.STRING,
  walk_rating: Sequelize.STRING,
  walk_rating_comment: Sequelize.STRING,
  location_rating: Sequelize.STRING,
  location_rating_comment: Sequelize.STRING,
  completed: Sequelize.INTEGER,
  total_attendees: Sequelize.INTEGER
});

WalkingRecord.hasOne(WalkingEvent);

// export walking record
module.exports = WalkingRecord;

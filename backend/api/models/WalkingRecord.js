const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "WalkingRecord";

// walking record model
const WalkingRecord = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  organizer: Sequelize.STRING,
  fullname: Sequelize.STRING,
  title: Sequelize.STRING,
  email: Sequelize.STRING,
  venue: Sequelize.STRING,
  date: Sequelize.STRING,
  start_time: Sequelize.STRING,
  end_time: Sequelize.STRING,
  location: Sequelize.STRING,
  distance: Sequelize.INTEGER,
  duration: Sequelize.INTEGER,
  date: Sequelize.STRING,
  start_time: Sequelize.STRING,
  location: Sequelize.STRING,
  intensity: Sequelize.STRING,
  walk_rating: Sequelize.STRING,
  walk_rating_comment: Sequelize.STRING,
  location_rating: Sequelize.STRING,
  location_rating_comment: Sequelize.STRING,
  completed: Sequelize.INTEGER
});

// export walking record
module.exports = WalkingRecord;

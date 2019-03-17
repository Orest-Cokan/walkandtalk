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
  email: Sequelize.STRING,
  organizer: Sequelize.STRING,
  fullname: Sequelize.STRING,
  title: Sequelize.STRING,
  distance: Sequelize.INTEGER,
  duration: Sequelize.INTEGER,
  intensity: Sequelize.STRING,
  venue: Sequelize.STRING,
  walk_rating: Sequelize.STRING,
  walk_rating_comment: Sequelize.STRING,
  location_rating: Sequelize.STRING,
  location_rating_comment: Sequelize.STRING,
  completed: Sequelize.INTEGER
});

// export walking record
module.exports = WalkingRecord;

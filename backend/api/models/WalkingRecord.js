const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "EventRecord";

// walking record model
const EventRecord = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: Sequelize.STRING,
  fullname: Sequelize.STRING,
  duration: Sequelize.INTEGER,
  distance: Sequelize.INTEGER,
  intensity: Sequelize.STRING,
  venue: Sequelize.STRING,
  walk_rating: Sequelize.STRING,
  walk_rating_comment: Sequelize.STRING,
  location_rating: Sequelize.STRING,
  location_rating_comment: Sequelize.STRING,
});



// export event record
module.exports = EventRecord;

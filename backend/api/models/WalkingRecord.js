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
  fullname: Sequelize.STRING,
  commentsLocation: Sequelize.STRING,
  commentsWalk: Sequelize.STRING,
  walkRating: Sequelize.INTEGER,
  locationRating: Sequelize.INTEGER
});

// export walking record
module.exports = WalkingRecord;

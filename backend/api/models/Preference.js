const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "preferences";

// Preference model
const Preference = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  distance: Sequelize.INTEGER,
  duration: Sequelize.INTEGER,
  intensity: Sequelize.STRING,
  venue: Sequelize.STRING,
  location: Sequelize.STRING
});

// export preference model
module.exports = Preference;

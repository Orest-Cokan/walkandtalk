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
  distance: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  intensity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  venue: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

// export preference model
module.exports = Preference;

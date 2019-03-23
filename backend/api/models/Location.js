const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "locations";

// Location model
const Location = sequelize.define(tableName, {
  streetName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  long: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

// export location model
module.exports = Location;

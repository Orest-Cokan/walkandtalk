const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "locations";

// Location model
const Location = sequelize.define(tableName, {
  streetName: {
    type: Sequelize.STRING,
    allowedNull: false
  },
  lat: {
    type: Sequelize.FLOAT,
    allowedNull: false
  },
  long: {
    type: Sequelize.FLOAT,
    allowedNull: false
  }
});

// export location model
module.exports = Location;

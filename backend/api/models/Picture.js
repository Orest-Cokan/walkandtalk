const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "pictures";

// picture model
const Picture = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  image: {
    type: Sequelize.STRING
  }
});

// export picture model
module.exports = Picture;

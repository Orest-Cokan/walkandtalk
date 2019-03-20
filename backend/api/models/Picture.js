const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "pictures";

// walkingevent model
const Picture = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  image: Sequelize.STRING
});

// export walkingevent model
module.exports = Picture;

const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "redcap";

// Redcap model
const Redcap = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true
  },
  remind: Sequelize.BOOLEAN,
  date: Sequelize.STRING
});

// export redcap model
module.exports = Redcap;

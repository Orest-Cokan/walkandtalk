const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "notifications";

// Notification model
const Notification = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: Sequelize.STRING,
  isRead: Sequelize.INTEGER,
  type: Sequelize.STRING,
  eventId: Sequelize.INTEGER,
  eventTitle: Sequelize.STRING,
  recordId: Sequelize.INTEGER,
  recordTitle: Sequelize.STRING
});

// export notification
module.exports = Notification;

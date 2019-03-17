const Sequelize = require("sequelize");
const sequelize = require("../../config/database");
const Attendee = require("./Attendee");
const Location = require("./Location");
const EventRecord = require("./EventRecord");

// table name
const tableName = "PastEvent";

// pastevent model
const PastEvent = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  organizer: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  date: Sequelize.STRING,
  start_time: Sequelize.STRING,
  end_time: Sequelize.STRING,
});

// set the associations
PastEvent.hasMany(Attendee, {
  onDelete: "CASCADE",
  hooks: true
});
Attendee.belongsTo(PastEvent);
PastEvent.hasMany(EventRecord, {
  onDelete: "CASCADE",
  hooks: true
});
PastEvent.hasOne(Location, {
  onDelete: "CASCADE",
  hooks: true
});

// export pastevent model
module.exports = PastEvent;

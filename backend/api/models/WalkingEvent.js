const Sequelize = require("sequelize");
const sequelize = require("../../config/database");
const Attendee = require("./Attendee");
const Location = require("./Location");

// table name
const tableName = "WalkingEvent";

// walkingevent model
const WalkingEvent = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  organizer: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  date: Sequelize.STRING,
  start_time: Sequelize.STRING,
  end_time: Sequelize.STRING,
  intensity: Sequelize.STRING,
  venue: Sequelize.STRING
});

// set the associations
WalkingEvent.hasMany(Attendee);
Attendee.belongsTo(WalkingEvent);
WalkingEvent.hasOne(Location);

// export walkingevent model
module.exports = WalkingEvent;

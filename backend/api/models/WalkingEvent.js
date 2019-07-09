const Sequelize = require("sequelize");
const sequelize = require("../../config/database");
const Attendee = require("./Attendee");
const Location = require("./Location");

// table name
const tableName = "walkingevents";

// walkingevent model
const WalkingEvent = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  organizer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tags: {
    type: Sequelize.STRING,
    allowNull: true
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  start_time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  end_time: {
    type: Sequelize.STRING,
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
  total_attendees: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

// set the associations
WalkingEvent.hasMany(Attendee, {
  onDelete: "CASCADE",
  hooks: true
});
Attendee.belongsTo(WalkingEvent);
WalkingEvent.hasOne(Location, {
  onDelete: "CASCADE",
  hooks: true
});

// export walkingevent model
module.exports = WalkingEvent;

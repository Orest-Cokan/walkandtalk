const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const Attendee = sequelize.define("attendee", {
  name: Sequelize.STRING
});

export default Attendee;

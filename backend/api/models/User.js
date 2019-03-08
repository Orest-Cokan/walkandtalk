const Sequelize = require("sequelize");
const bcryptService = require("../services/bcrypt.service");

const sequelize = require("../../config/database");

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  }
};

// table name
const tableName = "users";

// user model
const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: Sequelize.STRING,
    fullname: Sequelize.STRING,
    menopausal_stage: Sequelize.STRING,
    intensity: Sequelize.STRING,
    venue: Sequelize.STRING,
    location: Sequelize.STRING
  },

  { hooks, tableName }
);

// eslint-disable-next-line
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = User;

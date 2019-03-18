const Sequelize = require("sequelize");
const bcryptService = require("../services/bcrypt.service");

const sequelize = require("../../config/database");

// hook for a user to encrypt their password
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
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    menopausal_stage: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: Sequelize.STRING,
    registered: Sequelize.INTEGER,
    intensity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    venue: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dob: {
      type: Sequelize.STRING,
      allowNull: false
    },
    distance: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    redcapID: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
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

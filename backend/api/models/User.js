const Sequelize = require("sequelize");
const bcryptService = require("../services/bcrypt.service");
const sequelize = require("../../config/database");
const Preference = require("./Preference");
const Picture = require("./Picture");

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
  tableName,
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true
    },
    password: Sequelize.STRING,
    fullname: Sequelize.STRING,
    dob: Sequelize.STRING,
    menopausal_stage: Sequelize.STRING,
    registered: Sequelize.INTEGER,
    redcapID: Sequelize.INTEGER
  },

  { hooks, tableName }
);

// set the associations
User.hasOne(Preference, {
  onDelete: "CASCADE",
  hooks: true
});
User.hasOne(Picture);
Preference.belongsTo(User);
Picture.belongsTo(User);

// eslint-disable-next-line
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = User;

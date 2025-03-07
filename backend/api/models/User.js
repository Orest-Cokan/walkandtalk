const Sequelize = require("sequelize");
const bcryptService = require("../services/bcrypt.service");
const sequelize = require("../../config/database");
const Preference = require("./Preference");
const Picture = require("./Picture");
const Redcap = require("./Redcap");

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
    email: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dob: {
      type: Sequelize.STRING,
      allowNull: false
    },
    menopausal_stage: {
      type: Sequelize.STRING,
      allowNull: false
    },
    registered: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    researcher: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    }
  },

  { hooks, tableName }
);

// set hasOne association Prefernece
User.hasOne(Preference, {
  onDelete: "CASCADE",
  hooks: true
});
// set hasOne association Picture
User.hasOne(Picture);

//set hasOne association with Redcap
User.hasOne(Redcap);

// set belongsTo association
Preference.belongsTo(User);
Picture.belongsTo(User);
Redcap.belongsTo(User);

// eslint-disable-next-line
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

// export user model
module.exports = User;

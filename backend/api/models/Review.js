const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// table name
const tableName = "reviews";

// Review model
const Review = sequelize.define(tableName, {
  location_comment: Sequelize.STRING,
  location_rating: Sequelize.STRING
});

// export attendee model
module.exports = Review;

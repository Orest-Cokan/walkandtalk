const development = {
  database: "databasename",
  username: "username",
  password: "password",
  host: "localhost",
  dialect: "sqlite" || "mysql" || "postgres"
};

const testing = {
  database: "databasename",
  username: "username",
  password: "password",
  host: "localhost",
  dialect: "sqlite" || "mysql" || "postgres"
};

const production = {
  database: "CMPUT401",
  username: "CMPUT401",
  password: "cmput401",
  host: "localhost",
  dialect: "sqlite" || "mysql" || "postgres"
};

module.exports = {
  development,
  testing,
  production
};

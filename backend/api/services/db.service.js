const database = require("../../config/database");
const makeResearchers = require("./research.service");
const recordsTask = require("../../config/cron/records");
const upcomingEventTask = require("../../config/cron/upcomingEvent");

const dbService = (environment, migrate) => {
  const authenticateDB = () => database.authenticate();

  const dropDB = () => database.drop();

  const syncDB = () => database.sync();

  const successfulDBStart = () =>
    console.info(
      "connection to the database has been established successfully"
    );

  const errorDBStart = err =>
    console.info("unable to connect to the database:", err);

  const wrongEnvironment = () => {
    console.warn(
      `only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`
    );
    return process.exit(1);
  };

  // Reminder to change INIT tasks upon initilizing the DB
  const initTasks = async () => {
    try {
      await makeResearchers();
      await recordsTask();
      await upcomingEventTask();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startMigrateTrue = async () => {
    try {
      await syncDB();
      await successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startMigrateFalse = async () => {
    try {
      await dropDB();
      await syncDB();
      await successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startDev = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startStage = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startTest = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startProd = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const start = async () => {
    switch (environment) {
      case "development":
        await startDev();
        await initTasks();
        break;

      case "staging":
        await startStage();
        await initTasks();

        break;

      case "testing":
        await startTest();
        await initTasks();

        break;

      case "production":
        await startProd();
        await initTasks();

        break;

      default:
        await wrongEnvironment();
    }
  };

  return {
    start
  };
};

module.exports = dbService;

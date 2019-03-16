const cron = require("node-cron");

var task = cron.schedule("* * * * *", () => {
  console.log("running a task every minute");
});

module.exports = task;

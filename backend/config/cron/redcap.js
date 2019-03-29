const cron = require("node-cron");
const Redcap = require("../../api/models/Redcap");

// cron job check for events to delete every hour
var redcapTask = cron.schedule("* * * * *", () => {
  let changed = 0;
  const today = new Date().toISOString().split("T")[0];
  Redcap.findAll({
    where: {
      date: {
        lte: today
      }
    }
  }).then(users => {
    users.forEach(user => {
      user.update({
        notify: true
      });
      console.log("we are updating a user my dude");
      changed = changed + 1;
    });
    console.log("Changed a total of " + changed + " redcap users");
  });
});

module.exports = redcapTask;

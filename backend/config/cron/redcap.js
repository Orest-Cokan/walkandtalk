const cron = require("node-cron");
const Redcap = require("../../api/models/Redcap");

// cron job check for events to delete every hour
var redcapTask = cron.schedule("29 03 * * *", () => {
  let changed = 0;
  const today = new Date().toISOString().split("T")[0];
  Redcap.findAll({
    where: {
      notify: false,
      date: {
        lte: today
      }
    }
  }).then(users => {
    users.forEach(user => {
      user.update({
        notify: true
      });
      changed = changed + 1;
    });
    console.log("Changed a total of " + changed + " redcap users");
  });
});

module.exports = redcapTask;

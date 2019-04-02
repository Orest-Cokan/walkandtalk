const cron = require("node-cron");
const Notification = require("../../api/models/Notification");

// This task passes the total unread notifications to connected clients
// Runs every second for real time updates 
class unreadNotifications {
  constructor(socket, email) {
    this.task = cron.schedule("* * * * *", () => {
      console.log("Running notification task - unreadNotifications", socket.id, email);
      Notification.findAll({
        where: { email: email, isRead: 0 },
      }).then(notifications => {
          socket.emit('total_unread_notifications', notifications.length);
      });
    });
  }
  runTask(){
    this.task.start();
  }
}
//module.exports = unreadNotifications;


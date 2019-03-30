const Notification = require("../models/Notification");

// Notification Controller
const NotificationController = () => {
  
  // Create a notification
  const create = async (req, res) => {
    const { body } = req;
    console.log(body.email);
    try {
      Notification.create({
        email: body.email,
        isRead: body.isRead,
        type: body.type,        // types: upcomingEvent, updatedEvent, cancelledEvent, eventRecord, questionnaire
        eventID: body.eventID,  // for types (updatedEvent, upcomingEvent), otherwise null
        recordID: body.recordID // for type (eventRecord), otherwise null
      });

      return res
        .status(200)
        .json({ msg: "Successfully added a notification" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error m" });
    }
  };

  // Get notifications (for testing only)
  const getAll = async (req, res) => {
    try {
      const notifications = await Notification.findAll();
      return res.status(200).json({ notifications });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // Get notifications for a user
  const getNotifications = async (req, res) => {
    const { email } = req.params;
    try {
      const notifications = await Notification.findAll({
        where: { email: email }
      });
      return res.status(200).json({ notifications });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  return {
    create,
    getAll,
    getNotifications,
  };
};

module.exports = NotificationController;

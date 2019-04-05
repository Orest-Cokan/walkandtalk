const Notification = require("../models/Notification");

// Notification Controller
const NotificationController = () => {
  
  // Create a notification
  const create = async (req, res) => {
    const { body } = req;
    try {
      Notification.create({
        email: body.email,
        isRead: body.isRead,
        type: body.type,              // types: upcomingEvent, updatedEvent, cancelledEvent, eventRecord, questionnaire
        subjectId: body.subjectId,    // the subject's id (event or record) depending on the notif type
        title: body.title
      });
      return res
        .status(200)
        .json({ msg: "Successfully added a notification" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // Update notification
  const update = async (req, res) => {
    const { body } = req;
    Notification.update(
      {
        isRead: body.isRead
      },
      { returning: true, where: { id: body.id } }
    )
      .then(self => {
        return res.status(200).json(self[1]);
      })
      .catch(function(err) {
        return res.status(500).json({ msg: "Internal server error" });
      });
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

   // Get unread notifications for a user
   const getUnreadNotifications = async (req, res) => {
    const { email } = req.params;
    try {
      const notifications = await Notification.findAll({
        where: { email: email, isRead: 0 }
      });
      return res.status(200).json({ notifications });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  return {
    create,
    update,
    getAll,
    getNotifications,
    getUnreadNotifications
  };
};

module.exports = NotificationController;

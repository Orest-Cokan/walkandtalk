import {
  NOTIFICATION_CREATE,
  NOTIFICATION_UPDATE,
  SET_NOTIFICATIONS,
  SET_UNREAD_NOTIFICATIONS
} from "./types";
import getIP from "../constants/Ip";
import axios from "axios";

// Action to send an "updatedEvent" or "cancelledEvent" notification to other users
export const sendNotification = (token, subjectId, type, title) => {
  return async dispatch => {
    var ip = getIP();
    var getAttendeesUrl = ip + "private/walkingevent/" + subjectId;
    var sendNotifUrl = ip + "private/notification";
    var attendees = [];
    // Get all event attendees
    await axios
      .get(getAttendeesUrl, { headers: { Authorization: "Bearer " + token } })
      .then(res => {
        attendees = res.data.walkingevent.attendees;

        // Send notification to all attendees
        console.log("sending notifications...");
        attendees.forEach(async function(attendee) {
          const notification = {
            email: attendee.email,
            isRead: 0,
            type: type,
            subjectId: subjectId,
            title,
            title
          };
          await axios
            .post(sendNotifUrl, notification, {
              headers: { Authorization: "Bearer " + token }
            })
            .then(res => {
              dispatch({ type: NOTIFICATION_CREATE });
            });
        });
      })
      .catch(err => {
        console.log(err, "Failed to send notification");
      });
  };
};

// Action to update notification
export const updateNotification = (id, isRead, token) => {
  console.log("We are updating a notification, id: " + id, "isRead: " + isRead);
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/notification";
    const notification = {
      id: id,
      isRead: isRead
    };
    await axios
      .put(url, notification, { headers: { Authorization: "Bearer " + token } })
      .then(res => {
        dispatch({ type: NOTIFICATION_UPDATE });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// Action to get notifications by user
export const getNotifications = (token, email) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/notification/" + email;
    await axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then(res => {
        dispatch({
          type: SET_NOTIFICATIONS,
          payload: res.data.notifications
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// Action to get unread notifications by user
export const getUnreadNotifications = (token, email) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/notification/unread/" + email;
    await axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then(res => {
        dispatch({
          type: SET_UNREAD_NOTIFICATIONS,
          payload: res.data.notifications
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

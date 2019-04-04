import {
    NOTIFICATION_CREATE,
    NOTIFICATION_UPDATE,
    SET_NOTIFICATIONS,
    SET_UNREAD_NOTIFICATIONS
  } from "./types";
  import getIP from "../constants/Ip";
  import axios from "axios";
 
  
  // Action to send an "updatedEvent" or "cancelledEvent" notification to other users
  export const sendNotification = (
      subjectId,
      type
  ) => {
    return async dispatch => {
      var ip = getIP();
      var getAttendeesUrl = ip + "public/walkingevent/" + subjectId;
      var sendNotifUrl = ip + "public/notification";
      var attendees = [];
      // Get all event attendees
      await axios
      .get(getAttendeesUrl)
      .then(res => {
        attendees = res.data.walkingevent.attendees;
        
        // Send notification to all attendees
        attendees.forEach(async function(attendee) {
          const notification = {
            email: attendee.email,
            isRead: 0,
            type: type,
            subjectId: subjectId,
          };
          await axios
          .post(sendNotifUrl, notification)
          .then(res => {
            dispatch({ type: NOTIFICATION_CREATE });
          })
        })
      })
      .catch(err => {
        console.log(err, "Failed to send notification");
      });         
    };
  };

  // Action to update notification
  export const updateNotification = (
    id,
    isRead
  ) => {
    return async dispatch => {
      var ip = getIP();
      var url = ip + "public/notification";
      const notification = {
        id: id,
        isRead: isRead
      };
      await axios
        .put(url, notification)
        .then(res => {
          dispatch({ type: NOTIFICATION_UPDATE });
        })
        .catch(err => {
          console.log(err);
        });
    };
  };

  // Action to get notifications by user
  export const getNotifications = email => {
    return async dispatch => {
      var ip = getIP();
      var url = ip + "public/notification/" + email;
      await axios
        .get(url)
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
  export const getUnreadNotifications = email => {
    return async dispatch => {
      var ip = getIP();
      var url = ip + "public/notification/unread/" + email;
      await axios
        .get(url)
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
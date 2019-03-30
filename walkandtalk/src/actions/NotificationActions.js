import {
    NOTIFICATION_CREATE,
    SET_NOTIFICATIONS
  } from "./types";
  import getIP from "../constants/Ip";
  import axios from "axios";
 
  
  // Action to send an "updatedEvent" notification to other users
  export const sendUpdatedEventNotif = (
      eventID,
  ) => {
      // get event attendee emails
      
      return dispatch => {
      var ip = getIP();
      var url = ip + "public/notification";
      const notification = {
          email: email,
          isRead: 0,
          type: 'updatedEvent',
          eventID: eventID,
          recordID: null
      };
      axios
          .post(url, notification)
          .then(res => {
          if (res.status === 200) {
              console.log(res.status, "status");
              console.log(notification, "updatedEvent notification");
              dispatch({ type: NOTIFICATION_CREATE });
              Actions.reset("app");
          }
          })
          .catch(err => {
          console.log(err, "Failed to create 'updatedEvent' notification");
          });
      };
  };


  // Action to get notifications by user
  export const getNotifications = email => {
    return dispatch => {
      var ip = getIP();
      var url = ip + "public/notification/" + email;
      axios
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

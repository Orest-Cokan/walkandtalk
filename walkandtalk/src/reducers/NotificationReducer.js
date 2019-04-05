import { 
  NOTIFICATION_CREATE,
  NOTIFICATION_UPDATE,
  SET_NOTIFICATIONS,
  SET_UNREAD_NOTIFICATIONS,
} from "../actions/types";
  
export const INITIAL_STATE = {
    notification: [],
    unread_notifications: [],
    notifications: []
  };
  
// Notification reducer
export const notification = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATION_CREATE:
      return { ...state, notification: action.payload };
    case NOTIFICATION_UPDATE:
      return { ...state, notification: action.payload };  
    case SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    case SET_UNREAD_NOTIFICATIONS:
      return { ...state, unread_notifications: action.payload };
    default:
      return state;
  }
};
  
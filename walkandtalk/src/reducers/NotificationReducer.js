import { 
  NOTIFICATION_CREATE,
  NOTIFICATION_UPDATE,
  SET_NOTIFICATIONS 
} from "../actions/types";
  
  const INITIAL_STATE = {
    notification: [],
    notifications: []
  };
  
  // Notification reducer
  const notification = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case NOTIFICATION_CREATE:
        return { ...state, notification: action.payload };
      case NOTIFICATION_UPDATE:
        return { ...state, notification: action.payload };  
      case SET_NOTIFICATIONS:
        return { ...state, notifications: action.payload };
      default:
        return state;
    }
  };
  
  export default notification;
  
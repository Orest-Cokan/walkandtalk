import {
  SET_EVENTS,
  SET_USER_EVENTS,
  EVENT_CREATE,
  EVENT_DELETE,
  EVENT_EDIT
} from "../actions/types";

export const INITIAL_STATE = {
  events: [],
  userEvents: []
};

// event reducer
export const event = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return { ...state, events: action.payload };
    case SET_USER_EVENTS:
      return { ...state, userEvents: action.payload };
    case EVENT_CREATE:
      return { ...state, event: action.payload };
    case EVENT_DELETE:
      return { ...state, event: action.payload };
    case EVENT_EDIT:
      return { ...state };
    default:
      return state;
  }
};
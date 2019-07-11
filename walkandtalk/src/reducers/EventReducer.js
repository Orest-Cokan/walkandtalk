import {
  SET_EVENTS,
  SET_ALL_EVENTS,
  SET_USER_EVENTS,
  SET_NON_USER_EVENTS,
  EVENT_CREATE,
  EVENT_DELETE,
  EVENT_EDIT
} from "../actions/types";

export const INITIAL_STATE = {
  events: [],
  all_events: [],
  userEvents: [],
  nonUserEvents: []
};

// event reducer
export const event = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return { ...state, events: action.payload };
    case SET_ALL_EVENTS:
      return { ...state, all_events: action.payload };
    case SET_USER_EVENTS:
      return { ...state, userEvents: action.payload };
    case SET_NON_USER_EVENTS:
      return { ...state, nonUserEvents: action.payload };
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

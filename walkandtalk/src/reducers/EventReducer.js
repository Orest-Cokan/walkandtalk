import { SET_EVENTS, EVENT_CREATE, EVENT_DELETE } from "../actions/types";

const INITIAL_STATE = {
  events: []
};

// event reducer
const event = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return { ...state, events: action.payload };
    case EVENT_CREATE:
      return { ...state, event: action.payload };
    case EVENT_DELETE:
      return { ...state, event: action.payload };
    default:
      return state;
  }
};

export default event;

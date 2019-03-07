import { EVENT_FETCH_ALL, EVENT_CREATE } from "../actions/types";

const INITIAL_STATE = {
  events: []
};

const event = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT_FETCH_ALL:
      return { ...state, events: action.payload };
    case EVENT_CREATE:
      return { ...state, events: action.payload };
    default:
      return state;
  }
};

export default event;

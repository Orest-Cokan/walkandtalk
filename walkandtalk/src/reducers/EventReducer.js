import { EVENT_FETCH_ALL, EVENT_ADD } from "../actions/types";

const INITIAL_STATE = {
  events: []
};

const event = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT_FETCH_ALL:
      return { ...state, events: action.payload };
    case EVENT_ADD:
      return { ...state, events: action.payload };
    default:
      return state;
  }
};

export default event;

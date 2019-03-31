import { ATTENDEE_ADD, ATTENDEE_DELETE } from "../actions/types";

const INITIAL_STATE = {
  attendee: [],
};

// Attendee reducer
const attendee = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ATTENDEE_ADD:
      return { ...state, attendee: action.payload };
    case ATTENDEE_DELETE:
      return { ...state, attendee: action.payload };
    default:
      return state;
  }
};

export default attendee;

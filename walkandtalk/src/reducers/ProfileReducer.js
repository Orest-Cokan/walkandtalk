import { PROFILE_EDIT, PROFILE_FETCH } from "../actions/types";

const INITIAL_STATE = {
  profile: {
    fullname: null,
    email: null,
    menopausal_stage: null,
    intensity: null,
    venue: null,
    location: null
  }
};

const event = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_EDIT:
      return { ...state, events: action.payload };
    case PROFILE_FETCH:
      return { ...state, events: action.payload };
    default:
      return state;
  }
};

export default event;

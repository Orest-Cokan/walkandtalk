import { SET_TOKEN } from "../actions/types";

export const INITIAL_STATE = {
  token: ""
};

// event record reducer
export const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

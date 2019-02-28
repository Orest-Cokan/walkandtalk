import * as types from "../types";

const initialState = [];

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EVENTS:
      return payload;

    case types.EDIT_EVENT:
      let s = [...state];
      s[action.payload.index] = action.payload.event;
      return s;

    case types.ADD_EVENT:
      let s = [...state];
      s.push(action.payload.event);
      return s;

    default:
      return state;
  }
};

export default eventReducer;

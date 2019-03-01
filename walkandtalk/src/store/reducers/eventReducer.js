import * as types from "../types";

const initialState = [];


// Universal reducer for events, handles setting events,
// editing an event and adding an event
const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EVENTS:
      return payload;

    case types.EDIT_EVENT:
      let s = [...state];
      s[action.payload.index] = action.payload.event;
      return s;

    case types.ADD_EVENT:
      let p = [...state];
      p.push(action.payload.event);
      return p;

    default:
      return state;
  }
};

export default eventReducer;

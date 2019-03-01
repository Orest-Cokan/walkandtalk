import * as types from "../types.js";

// Action for setting a profile
export function setProfile(profile) {
  return {
    type: types.SET_PROFILE,
    payload: profile
  };
}

// Action for adding an event
export function addEvent(event) {
  return {
    type: types.ADD_EVENT,
    payload: event
  };
}

// Action for setting all events
export function setEvents(events) {
  return {
    type: types.SET_EVENTS,
    payload: events
  };
}

// Action for editing an event
export function editEvent(event, index) {
  return {
    type: types.EDIT_EVENT,
    payload: {
      event,
      index
    }
  };
}

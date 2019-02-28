import * as types from "../types.js";

export function setProfile(profile) {
  return {
    type: types.SET_PROFILE,
    payload: profile
  };
}

export function addEvent(event) {
  return {
    type: types.ADD_EVENT,
    payload: event
  };
}

export function setEvents(events) {
  return {
    type: types.SET_EVENTS,
    payload: events
  };
}

export function editEvent(event, index) {
  return {
    type: types.EDIT_EVENT,
    payload: {
      event,
      index
    }
  };
}

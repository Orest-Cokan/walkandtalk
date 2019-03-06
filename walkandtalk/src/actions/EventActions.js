import { EVENT_FETCH_ALL, EVENT_ADD } from "./types";
import { Actions } from "react-native-router-flux";

// fetch all events
export const fetchEvents = () => {
  // return dispatch => {}
  // http call database to fetch every single event
};

// add an event
export const addEvent = (user, title, description) => {
  const walking_event = {
    user: user,
    title: title,
    description: description
  };

  // http call to
};

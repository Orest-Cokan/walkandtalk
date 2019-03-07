import { EVENT_FETCH_ALL, EVENT_CREATE } from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";

// fetch all events
export const fetchEvents = () => {
  return dispatch => {
    axios
      .get("http://127.0.0.1:2017/public/walkingevents", walking_event)
      .then(response => {
        dispatch({ type: EVENT_FETCH_ALL, response });
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// add an event
export const createEvent = (
  user,
  title,
  description,
  date,
  start_time,
  end_time,
  intensity,
  venue,
  location
) => {
  return dispatch => {
    const walking_event = {
      user: user,
      title: title,
      description: description,
      date: date,
      start_time: start_time,
      end_time: end_time,
      intensity: intensity,
      venue: venue,
      location: location
    };
    axios
      .post("http://127.0.0.1:2017/public/walkingevent", walking_event)
      .then(() => {
        dispatch({ type: EVENT_CREATE });
        Actions.reset("app");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

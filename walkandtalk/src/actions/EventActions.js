import { SET_EVENTS, EVENT_CREATE, EVENT_DELETE } from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";

// action to fetch all events
export const fetchEvents = () => {
  return dispatch => {
    axios
      .get("http://10.0.2.2:2017/public/walkingevents")
      .then(res => {
        dispatch({ type: SET_EVENTS, payload: res.data.events });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// action to create an event
export const createEvent = (
  organizer,
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
      organizer: organizer,
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
      .post("http://10.0.2.2:2017/public/walkingevent", walking_event)
      .then(res => {
        if (res.status === 200) {
          console.log(res.status, "is this even logged???");
          dispatch({ type: EVENT_CREATE });
          Actions.reset("app");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// action to delete an event
export const deleteEvent = id => {
  return dispatch => {
    axios
      .delete("http://10.0.2.2:2017/public/walkingevent/" + id)
      .then(res => {
        console.log(res.data);
        dispatch({ type: EVENT_DELETE, payload: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

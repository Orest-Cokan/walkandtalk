import {
  SET_EVENTS,
  SET_USER_EVENTS,
  EVENT_CREATE,
  EVENT_DELETE,
  EVENT_EDIT
} from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import getIP from "../constants/Ip";

// action to fetch all events
export const fetchEvents = () => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingevents";
    axios
      .get(url)
      .then(res => {
        dispatch({ type: SET_USER_EVENTS, payload: res.data.events });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// action to fetch all events
export const fetchUserEvents = email => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingevents/" + email;
    axios
      .get(url)
      .then(res => {
        console.log(res.data.events, "is this anything?");
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
  email,
  title,
  date,
  start_time,
  end_time,
  description,
  intensity,
  venue,
  location,
  lat,
  long
) => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingevent";
    const walking_event = {
      organizer: organizer,
      email: email,
      title: title,
      date: date,
      start_time: start_time,
      end_time: end_time,
      description: description,
      intensity: intensity,
      venue: venue,
      location: {
        streetName: location,
        lat: lat,
        long: long
      }
    };
    axios
      .post(url, walking_event)
      .then(res => {
        if (res.status === 200) {
          console.log(res.status, "is this even logged???");
          console.log(walking_event, "is this null?");
          dispatch({ type: EVENT_CREATE });
          Actions.reset("app");
        }
      })
      .catch(err => {
        console.log(err, "kek");
      });
  };
};

// action to edit an event
export const editEvent = (
  title,
  id,
  date,
  startTime,
  endTime,
  description,
  intensity,
  venue,
  location
) => {
  const event = {
    title: title,
    id: id,
    date: date,
    start_time: startTime,
    end_time: endTime,
    description: description,
    intensity: intensity,
    venue: venue,
    location: location
  };
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingevent";
    axios
      .put(url, event)
      .then(res => {
        if (res.status === 200) {
          console.log("event", event);
          dispatch({ type: EVENT_EDIT, payload: event });
        }
      })
      .catch(err => {
        console.log("axios failure", err);
      });
  };
};

// action to delete an event
export const deleteEvent = id => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingevent/";
    axios
      .delete(url + id)
      .then(res => {
        console.log(res.data);
        dispatch({ type: EVENT_DELETE, payload: res.data });
        Actions.reset("app");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

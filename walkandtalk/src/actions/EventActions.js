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
  var ip = getIP();
  var url = ip + "public/walkingevents";
  return dispatch => 
    axios
      .get(url)
      .then(res => {
        dispatch({ type: SET_EVENTS, payload: res.data.events });
      })
      .catch(err => {
        console.log(err);
      });
};

// action to fetch user events
export const fetchUserEvents = email => {
  var ip = getIP();
  var url = ip + "public/walkingevents/" + email;
  return dispatch => 
    axios
      .get(url)
      .then(res => {
        dispatch({ type: SET_USER_EVENTS, payload: res.data.events });
      })
      .catch(err => {
        console.log(err);
      });
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
  var ip = getIP();
  var url = ip + "public/walkingevent";
  return dispatch => 
    axios
      .post(url, walking_event)
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: EVENT_CREATE });
          Actions.reset("app");
        }
      })
      .catch(err => {
        console.log(err, "kek");
      });
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
  var ip = getIP();
  var url = ip + "public/walkingevent";
  return dispatch => 
    axios
      .put(url, event)
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: EVENT_EDIT, payload: res.data.event });
        }
      })
      .catch(err => {
        console.log("axios failure", err);
      });
};

// action to delete an event
export const deleteEvent = id => {
  var ip = getIP();
  var url = ip + "public/walkingevent/";
  return dispatch => 
    axios
      .delete(url + id)
      .then(res => {
        dispatch({ type: EVENT_DELETE, payload: res.data.event });
        Actions.reset("app");
      })
      .catch(err => {
        console.log(err);
      });
};

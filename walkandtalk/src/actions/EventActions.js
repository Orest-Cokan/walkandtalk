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
import { Alert } from "react-native";

// action to fetch all events
export const fetchEvents = () => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingevents";
    await axios
      .get(url)
      .then(res => {
        dispatch({ type: SET_EVENTS, payload: res.data.events });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// action to fetch only the user's events
export const fetchUserEvents = email => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingevents/" + email;
    await axios
      .get(url)
      .then(res => {
        dispatch({ type: SET_USER_EVENTS, payload: res.data.events });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
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
  return async dispatch => {
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
    await axios
      .post(url, walking_event)
      .then(async res => {
        if (res.status === 200) {
          await dispatch({ type: EVENT_CREATE });
          await Alert.alert("Your event has been successfully created.");
          Actions.reset("app");
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.")
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
  location,
  lat,
  long
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
    location: {
      streetName: location,
      lat: lat,
      long: long
    }
  };
  return async dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingevent";
    await axios
      .put(url, event)
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: EVENT_EDIT, payload: event });
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// action to delete an event
export const deleteEvent = id => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingevent/";
    await axios
      .delete(url + id)
      .then(res => {
        dispatch({ type: EVENT_DELETE, payload: res.data });
        Actions.reset("app");
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

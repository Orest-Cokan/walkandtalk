import {
  SET_EVENTS,
  SET_USER_EVENTS,
  SET_NON_USER_EVENTS,
  EVENT_CREATE,
  EVENT_DELETE,
  EVENT_EDIT
} from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import getIP from "../constants/Ip";
import { Alert } from "react-native";

// action to fetch all events
export const fetchEvents = token => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/walkingevents";
    await axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
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
export const fetchUserEvents = (token, email) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/walkingevents/" + email;
    await axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then(res => {
        dispatch({ type: SET_USER_EVENTS, payload: res.data.events });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// action to fetch events the user is not attending/made
export const fetchNonUserEvents = (token, email) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/walkingeventsnon/" + email;
    await axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then(res => {
        dispatch({ type: SET_NON_USER_EVENTS, payload: res.data.events });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// action to create an event
export const createEvent = (
  token,
  organizer,
  email,
  title,
  date,
  start_time,
  end_time,
  description,
  tags,
  intensity,
  venue,
  location,
  lat,
  long
) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/walkingevent";
    const walking_event = {
      organizer: organizer,
      email: email,
      title: title,
      date: date,
      start_time: start_time,
      end_time: end_time,
      description: description,
      tags: tags.toString(),
      intensity: intensity,
      venue: venue,
      location: {
        streetName: location,
        lat: lat,
        long: long
      }
    };
    await axios
      .post(url, walking_event, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(async res => {
        if (res.status === 200) {
          await dispatch({ type: EVENT_CREATE });
          await Alert.alert("Your event has been successfully created.");
          Actions.reset("app");
        }
      })
      .catch(err => {
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// action to edit an event
export const editEvent = (
  token,
  title,
  id,
  date,
  startTime,
  endTime,
  description,
  tags,
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
    tags: tags.toString(),
    intensity: intensity,
    venue: venue,
    location: location
  };
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/walkingevent";
    await axios
      .put(url, event, { headers: { Authorization: "Bearer " + token } })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: EVENT_EDIT, payload: res.data.event });
        }
      })
      .catch(err => {
        console.log("THIS IS THE ERROR", err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// action to delete an event
export const deleteEvent = (token, id) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/walkingevent/";
    await axios
      .delete(url + id, { headers: { Authorization: "Bearer " + token } })
      .then(res => {
        dispatch({ type: EVENT_DELETE, payload: res.data.event });
        Actions.reset("app");
      })
      .catch(err => {
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

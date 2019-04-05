import {
  RECORD_UPDATE,
  SET_RECORDS,
  SET_COMPLETED_RECORDS,
  SET_UNCOMPLETED_RECORDS
} from "./types";
import getIP from "../constants/Ip";
import axios from "axios";
import { Alert } from "react-native";

// action to update event record
export const updateRecord = (
  token,
  id,
  email,
  venue,
  distance,
  duration,
  intensity,
  walk_rating,
  walk_rating_comment,
  location_rating,
  location_rating_comment,
  completed
) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/walkingrecord";
    const walking_record = {
      id: id,
      email: email,
      venue: venue,
      distance: distance,
      duration: duration,
      intensity: intensity,
      walk_rating: walk_rating,
      walk_rating_comment: walk_rating_comment,
      location_rating: location_rating,
      location_rating_comment: location_rating_comment,
      completed: completed
    };

    await axios
      .put(url, walking_record, { headers: { Authorization: 'Bearer ' + token } } )
      .then(res => {
        dispatch({ type: RECORD_UPDATE });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// action to get event records by user
export const getRecords = (token, email) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/walkingrecord/" + email;
    await axios
      .get(url, { headers: { Authorization: 'Bearer ' + token } } )
      .then(res => {
        dispatch({
          type: SET_RECORDS,
          payload: res.data.records
        });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// action to get completed event records by user
export const getCompletedRecords = (token, email) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/walkingrecord/completed/" + email;
    await axios
      .get(url, { headers: { Authorization: 'Bearer ' + token } } )
      .then(res => {
        dispatch({
          type: SET_COMPLETED_RECORDS,
          payload: res.data.records
        });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// action to get completed event records by user
export const getUncompletedRecords = (token, email) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/walkingrecord/uncompleted/" + email;
    await axios
      .get(url, { headers: { Authorization: 'Bearer ' + token } } )
      .then(res => {
        dispatch({
          type: SET_UNCOMPLETED_RECORDS,
          payload: res.data.records
        });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

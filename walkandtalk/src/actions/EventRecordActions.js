import {
  EVENT_RECORD_UPDATE,
  EVENT_RECORD_UPDATE_SUCCESS,
  EVENT_RECORD_UPDATE_FAIL,
  GET_ALL_EVENT_RECORDS,
  GET_EVENT_RECORDS_BY_USER,
  GET_COMPLETED_EVENT_RECORDS_BY_USER,
  GET_UNCOMPLETED_EVENT_RECORDS_BY_USER
} from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { Platform } from "react-native";

// action to update event record
export const updateEventRecord = (
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
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingrecord";
    const walking_record = {
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
    axios
      .put(url, walking_record)
      .then(res => {
        dispatch({ type: EVENT_RECORD_UPDATE });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// use this function to do error checking ty
// dispatch event record update success
const updateEventRecordSuccess = dispatch => {
  dispatch({
    type: EVENT_RECORD_UPDATE_SUCCESS
  });

  Actions.mainFormsPage();
};

// use this function to do error checking ty
// dispatch event record update fail
const updateEventRecordFail = dispatch => {
  console.log("fail", EVENT_RECORD_UPDATE_FAIL);
  dispatch({ type: EVENT_RECORD_UPDATE_FAIL });
};

// action to get all event records
export const getAllRecords = () => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingrecords";
    axios
      .get(url)
      .then(res => {
        dispatch({ type: GET_ALL_EVENT_RECORDS, payload: res.data.records });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// action to get event records by user
export const getRecordsByUser = email => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingrecord/";
    axios
      .get(url + email)
      .then(res => {
        dispatch({
          type: GET_EVENT_RECORDS_BY_USER,
          payload: res.data.records
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// action to get completed event records by user
export const getCompletedRecordsByUser = email => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingrecord/completed/";
    axios
      .get(url + email)
      .then(res => {
        dispatch({
          type: GET_COMPLETED_EVENT_RECORDS_BY_USER,
          payload: res.data.records
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// action to get completed event records by user
export const getUncompletedRecordsByUser = email => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingrecord/uncompleted/";
    axios
      .get(url + email)
      .then(res => {
        dispatch({
          type: GET_UNCOMPLETED_EVENT_RECORDS_BY_USER,
          payload: res.data.records
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

var getIP = () => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:2017/";
  } else if (Platform.OS === "ios") {
    return "http://127.0.0.1:2017/";
  }
};

import { SET_RECORDS, RECORD_UPDATE } from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { Platform } from "react-native";

// action to fetch all records
export const fetchAllRecords = email => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingrecord/" + email;
    axios
      .get(url)
      .then(res => {
        dispatch({ type: SET_RECORDS, payload: res.data.records });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const fetchCompletedRecords = email => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingrecord/completed/" + email;
    axios
      .get(url)
      .then(res => {
        dispatch({ type: SET_RECORDS, payload: res.data.records });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const fetchUncompletedRecords = email => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingrecord/uncompleted/" + email;
    axios
      .get(url)
      .then(res => {
        dispatch({ type: SET_RECORDS, payload: res.data.records });
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

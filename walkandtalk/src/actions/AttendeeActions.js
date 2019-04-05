import { ATTENDEE_ADD, ATTENDEE_DELETE } from "./types";
import axios from "axios";
import getIP from "../constants/Ip";
import { Alert } from "react-native";

// action to add an attendee
export const addAttendees = (
    token,
    id, 
    fullname, 
    email
  ) => {
    const attendee = {
      id: id,
      fullname: fullname,
      email: email
    };
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/attendee/add";
    await axios
      .put(url, attendee, { headers: { Authorization: 'Bearer ' + token } } )
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: ATTENDEE_ADD , payload: attendee });
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// action to remove an attendee
export const removeAttendees = (
  token,
  id, 
  email
) => {
  const attendee = {
    id: id,
    email: email
  };
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/attendee/remove";
    await axios
      .put(url, attendee, { headers: { Authorization: 'Bearer ' + token } } )
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: ATTENDEE_DELETE , payload: attendee });
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};
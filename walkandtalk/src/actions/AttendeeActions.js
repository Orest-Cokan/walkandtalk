import { ATTENDEE_ADD, ATTENDEE_DELETE } from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import getIP from "../constants/Ip";

// action to add an attendee
export const addAttendees = (id, name, email) => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingevent";
    const attendee = {
      id: id,
      name: name,
      email: email
    };
    axios
      .post(url, attendee)
      .then(res => {
        if (res.status === 200) {
          console.log(res.status, "is this logged???");
          console.log(attendee, "attendee adding...");
          dispatch({ type: ATTENDEE_ADD });
          Actions.reset("app");
        }
      })
      .catch(err => {
        console.log(err, "kek");
      });
  };
};

// action to remove an attendee
export const removeAttendees = (id, email) => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/walkingevent/";
    axios
      .delete(url + id)
      .then(res => {
        console.log(res.data);
        dispatch({ type: ATTENDEE_DELETE, payload: res.data });
        Actions.reset("app");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

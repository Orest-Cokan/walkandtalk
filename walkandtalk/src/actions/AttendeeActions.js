import { ATTENDEE_ADD, ATTENDEE_DELETE } from "./types";
import axios from "axios";
import getIP from "../constants/Ip";

// action to add an attendee
export const addAttendees = (
    id, 
    fullname, 
    email
  ) => {
    const attendee = {
      id: id,
      fullname: fullname,
      email: email
    };
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/attendee/add";
    axios
      .put(url, attendee)
      .then(res => {
        if (res.status === 200) {
          console.log(res.status, "is this logged???");
          console.log(attendee, "attendee adding...");
          dispatch({ type: ATTENDEE_ADD , payload: attendee });
        }
      })
      .catch(err => {
        console.log(err, "kek");
      });
  };
};

// action to remove an attendee
export const removeAttendees = (
  id, 
  email
) => {
  const attendee = {
    id: id,
    email: email
  };
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/attendee/remove";
    axios
      .put(url, attendee)
      .then(res => {
        if (res.status === 200) {
          console.log(res.status, "is this logged???");
          console.log(attendee, "attendee deleting...");
          dispatch({ type: ATTENDEE_DELETE , payload: attendee });
        }
      })
      .catch(err => {
        console.log(err, "kek");
      });
  };
};
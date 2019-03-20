import { ATTENDEE_ADD, ATTENDEE_DELETE} from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { Platform } from "react-native";


// action to create an event
export const addAttendees = (
  id,
  name,
  email
) => {
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
export const removeAttendees = (
  id,
  email
) => {
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


var getIP = () => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:2017/";
  } else if (Platform.OS === "ios") {
    return "http://127.0.0.1:2017/";
  }
};

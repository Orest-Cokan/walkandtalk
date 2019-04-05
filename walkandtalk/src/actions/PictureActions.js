import { PICTURE_EDIT, PICTURE_GET } from "./types";
import axios from "axios";
import getIP from "../constants/Ip";
import { Alert } from "react-native";

// Action to edit picture by user
export const editPicture = (token, email, image) => {
  const userPicture = {
    email,
    image
  };
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/user/picture";
    await axios
      .put(url, userPicture, { headers: { Authorization: 'Bearer ' + token } } )
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: PICTURE_EDIT, payload: userPicture });
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// Action to get picture by user
export const getPicture = (token, email) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/user/picture/" + email;
    await axios
      .get(url, { headers: { Authorization: 'Bearer ' + token } } )
      .then(res => {
        dispatch({
          type: PICTURE_GET,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

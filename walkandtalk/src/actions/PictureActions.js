import { PICTURE_EDIT, PICTURE_GET } from "./types";
import axios from "axios";
import getIP from "../constants/Ip";

// Action to edit picture by user
export const editPicture = (email, image) => {
  const userPicture = {
    email,
    image
  };
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/user/picture";
    axios
      .put(url, userPicture)
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: PICTURE_EDIT, payload: userPicture });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// Action to get picture by user
export const getPicture = email => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/user/picture/" + email;
    axios
      .get(url)
      .then(res => {
        console.log("getting picture", res.data);
        dispatch({
          type: PICTURE_GET,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

import {
    PICTURE_EDIT,
    PICTURE_GET
  } from "./types";
  import { Actions } from "react-native-router-flux";
  import axios from "axios";
  import { Platform } from "react-native";

  // Action to edit picture by user
  export const editPicture = (email, image) => {
    const userPicture = {
      email,
      image
    };
    return dispatch => {
      var ip = getIP();
      var url = ip + "public/user/picture";
      console.log('image in edit picture', userPicture);
      axios
        .put(url, userPicture)
        .then(res => {
          if (res.status === 200) {
            if (res.data === 1) {
              console.log('user picture in actions', userPicture)
              dispatch({ type: PICTURE_EDIT, payload: userPicture });
            }
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
          console.log('get picture',res.data)
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
  var getIP = () => {
    if (Platform.OS === "android") {
      return "http://10.0.2.2:2017/";
    } else if (Platform.OS === "ios") {
      return "http://127.0.0.1:2017/";
    }
  };
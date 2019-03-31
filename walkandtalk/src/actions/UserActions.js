import {
  USER_CREATE,
  USER_CREATE_FAIL,
  USER_CREATE_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_EDIT,
  USER_APPROVE,
  USER_DECLINE,
  GET_UNREGISTERED_USERS
} from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import getIP from "../constants/Ip";

// action to create a user
export const createUser = (
  email,
  password,
  password2,
  fullname,
  menopausal_stage,
  dob,
  venue,
  location,
  intensity,
  duration,
  distance
) => {
  const user = {
    email: email,
    password: password,
    password2: password2,
    fullname: fullname,
    menopausal_stage: menopausal_stage,
    dob: dob,
    preference: {
      venue: venue,
      location: location,
      intensity: intensity,
      duration: duration,
      distance: distance
    }
  };
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/user";
    console.log(user);
    dispatch({ type: USER_CREATE });
    axios
      .post(url, user)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.user);
          createUserSuccess(dispatch, res.data.user);
        }
      })
      .catch(err => {
        createUserFail(dispatch);
        console.log(err);
      });
  };
};

// dispatch creating a user failed
const createUserFail = dispatch => {
  dispatch({ type: USER_CREATE_FAIL });
};

// dispatch creating a user succesful
const createUserSuccess = (dispatch, user) => {
  dispatch({
    type: USER_CREATE_SUCCESS,
    payload: user
  });

  Actions.app();
};

// action to login a user
export const loginUser = (email, password) => {
  const user = {
    email: email,
    password: password
  };
  console.log("login", USER_LOGIN);
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/login";
    console.log(email, password);
    dispatch({ type: USER_LOGIN });
    axios
      .post(url, user)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.user, "meh memes!");
          loginUserSuccess(dispatch, res.data.user);
        }
      })
      .catch(err => {
        loginUserFail(dispatch);
        console.log(err);
      });
  };
};

// dispatch user login fail
const loginUserFail = dispatch => {
  console.log("fail", USER_LOGIN_FAIL);
  dispatch({ type: USER_LOGIN_FAIL });
};

// dispatch user login success
const loginUserSuccess = (dispatch, user) => {
  console.log(user, "wtfisgoingon");
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: user
  });
  Actions.app();
};

// action to edit a user
export const editUser = (
  fullname,
  email,
  dob,
  menopausal_stage,
  intensity,
  distance,
  duration,
  venue,
  location
) => {
  const user = {
    fullname: fullname,
    email: email,
    dob: dob,
    menopausal_stage: menopausal_stage,
    preference: {
      intensity: intensity,
      distance: distance,
      duration: duration,
      venue: venue,
      location: location
    }
  };
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/user";
    console.log("INSIDE EDIT USER", user);
    axios
      .put(url, user)
      .then(res => {
        if (res.status === 200) {
          if (res.data === 1) {
            dispatch({ type: USER_EDIT, payload: user });
          }
        }
      })
      .catch(err => {
        console.log("axios failure", err);
      });
  };
};

//get unregistered users 
export const getUnregisteredUsers = () => {
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/researcher/unregistered";
    axios
      .get(url)
      .then(res => {
        dispatch({ type: GET_UNREGISTERED_USERS, payload: res.data.users });
      })
      .catch(err => {
        console.log(err);
      });
  };
};


//approve request of a user 
export const approveUser = (email, redcapID) => {
  const user = {
    email: email,
    redcapID: redcapID
  };
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/researcher/accept";
    axios
      .put(url,user )
      .then(res => {
        dispatch({ type: USER_APPROVE });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

//decline request of a user 
export const declineUser = (email) => {
  const user = {
    email: email
  };
  return dispatch => {
    var ip = getIP();
    var url = ip + "public/researcher/deny";
    axios
      .post(url,user )
      .then(res => {
        dispatch({ type: USER_DECLINE });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

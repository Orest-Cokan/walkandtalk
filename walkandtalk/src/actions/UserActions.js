import {
  USER_CREATE,
  USER_CREATE_FAIL,
  USER_CREATE_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_EDIT,
  SET_USER,
  SET_ALL_USERS,
  USER_APPROVE,
  USER_DECLINE,
  GET_UNREGISTERED_USERS
} from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import getIP from "../constants/Ip";
import { Alert } from "react-native";

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
) => (dispatch) => {
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
  var ip = getIP();
  var url = ip + "public/user";
  dispatch({ type: USER_CREATE });
  return axios
    .post(url, user)
    .then(res => {
      if (res.status === 200) {
        createUserSuccess(dispatch, res.data.user);
      } else {
        createUserFail(dispatch);
      }
    })
    .catch(err => {
      Alert.alert("Something went wrong. Please try again.")
    });
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
export const loginUser = (email, password) => (dispatch) => {
  const user = {
    email: email,
    password: password
  };
  var ip = getIP();
  var url = ip + "public/login";
  dispatch({ type: USER_LOGIN });
  return axios
    .post(url, user)
    .then(res => {
      if (res.status === 200) {
        if (res.data.user.registered){
          loginUserSuccess(dispatch, res.data.user);
        }
        else{
          loginUserFail(dispatch);
          Alert.alert("Please wait for the researchers to review your profile.");
        }
      }
    })
    .catch(err => {
      Alert.alert("Something went wrong. Please check your username and password.")
    });
};

// dispatch user login fail
const loginUserFail = dispatch => {
  console.log("fail", USER_LOGIN_FAIL);
  dispatch({ type: USER_LOGIN_FAIL });
};

// dispatch user login success
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: user
  });
  Actions.app();
};

// action to get a single user
export const getUser = email => {
  var ip = getIP();
  var url = ip + "public/user/" + email;
  return dispatch => 
    axios
      .get(url)
      .then(res => {
        dispatch({ 
          type: SET_USER, 
          payload: res.data.user });
      })
      .catch(err => {
        console.log(err);
        console.log("ERROR in getUser")
      });
};

// action to get all users
export const getAllUsers = () => {
  var ip = getIP();
  var url = ip + "public/users";
  return dispatch => 
    axios
      .get(url)
      .then(res => {
        dispatch({ 
          type: SET_ALL_USERS, 
          payload: res.data.users,
         });
      })
      .catch(err => {
        console.log(err);
        console.log("ERROR in get all users")
      });
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
  var ip = getIP();
  var url = ip + "public/user";
  return dispatch => 
    axios
      .put(url, user)
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: USER_EDIT, payload: res.data.user });
        }
      })
      .catch(err => {
        console.log("axios failure", err);
      });
};

//get unregistered users
export const getUnregisteredUsers = () => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "public/researcher/unregistered";
    await axios
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
  return async dispatch => {
    var ip = getIP();
    var url = ip + "public/researcher/accept";
    await axios
      .put(url, user)
      .then(res => {
        dispatch({ type: USER_APPROVE });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

//decline request of a user
export const declineUser = email => {
  const user = {
    email: email
  };
  return async dispatch => {
    var ip = getIP();
    var url = ip + "public/researcher/deny";
    await axios
      .put(url, user)
      .then(res => {
        dispatch({ type: USER_DECLINE });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

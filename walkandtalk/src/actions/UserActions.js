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
  GET_UNREGISTERED_USERS,
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
  return async dispatch => {
    var ip = getIP();
    var url = ip + "public/user";
    dispatch({ type: USER_CREATE });
    await axios
      .post(url, user)
      .then(res => {
        if (res.status === 200) {
          createUserSuccess(dispatch);
        }
      })
      .catch(err => {
        createUserFail(dispatch);
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// dispatch creating a user failed
const createUserFail = dispatch => {
  dispatch({ type: USER_CREATE_FAIL });
};

// dispatch creating a user succesful
const createUserSuccess = (dispatch) => {
  dispatch({
    type: USER_CREATE_SUCCESS,
  });
  Alert.alert('','You have successfully signed up! Your information has been forwarded to our researchers. Expect to receive an email within 7 days.');
  Actions.reset("auth");
};

// action to login a user
export const loginUser = (email, password) => {
  const user = {
    email: email,
    password: password
  };
  return async dispatch => {
    var ip = getIP();
    var url = ip + "public/login";
    dispatch({ type: USER_LOGIN });
    await axios
      .post(url, user)
      .then(res => {
        if (res.status === 200) {
          // if (res.data.user.registered){
            loginUserSuccess(dispatch, res.data);
          // }
          // else{
            // loginUserFail(dispatch);
            // Alert.alert("Please wait for the researchers to review your profile.");
          // }
        }
      })
      .catch(err => {
        Alert.alert("Something went wrong. Please try again.");
      });
  };
};

// dispatch user login fail
const loginUserFail = dispatch => {
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
export const getUser = (token, email) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "private/user/" + email;
    await axios
      .get(url, { headers: { Authorization: 'Bearer ' + token }
      })
      .then(res => {
        dispatch({ 
          type: SET_USER, 
          payload: res.data.user });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

// action to get all users
export const getAllUsers = () => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "public/users";
    await axios
      .get(url)
      .then(res => {
        dispatch({ 
          type: SET_ALL_USERS, 
          payload: res.data.users,
         });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};


// action to edit a user
export const editUser = (
  token,
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
  var url = ip + "private/user";
  return async dispatch => 
    await axios
      .put(url, user, { headers: { Authorization: 'Bearer ' + token } } )
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: USER_EDIT, payload: res.data.user });
        }
      })
      .catch(err => {
        console.log("axios failure", err);
        Alert.alert("Something went wrong. Please try again later.");
      });
};

//get unregistered users
export const getUnregisteredUsers = (researcherEmail) => {
  return async dispatch => {
    var ip = getIP();
    var url = ip + "researcher/unregistered";
    await axios
      .get(url, {params: {email: researcherEmail}})
      .then((res) => {
        dispatch({ type: GET_UNREGISTERED_USERS, payload: res.data.users });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

//approve request of a user
export const approveUser = (email, redcapID, researcherEmail) => {
  const user = {
    userEmail: email,
    redcapID: redcapID
  };
  return async dispatch => {
    var ip = getIP();
    var url = ip + "researcher/accept";
    await axios
      .put(url, user, {params: {email: researcherEmail}})
      .then(res => {
        dispatch({ type: USER_APPROVE });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

//decline request of a user
export const declineUser = (email, researcherEmail) => {
  const user = {
    userEmail: email
  };
  return async dispatch => {
    var ip = getIP();
    var url = ip + "researcher/deny";
    await axios
      .put(url, user, {params: {email: researcherEmail}})
      .then(res => {
        dispatch({ type: USER_DECLINE });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong. Please try again later.");
      });
  };
};

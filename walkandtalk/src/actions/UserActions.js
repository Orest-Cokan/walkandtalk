import {
  USER_CREATE,
  USER_CREATE_FAIL,
  USER_CREATE_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS
} from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";

// action to create a user
export const createUser = (email, password, password2) => {
  const user = {
    email: email,
    password: password,
    password2: password2
  };
  return dispatch => {
    dispatch({ type: USER_CREATE });
    axios
      .post("http://10.0.2.2:2017/public/user", user)
      .then(res => {
        if (res.status === 200) {
          createUserSuccess(dispatch, res.data);
          console.log(res.data);
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
    console.log(email, password);
    dispatch({ type: USER_LOGIN });
    axios
      .post("http://10.0.2.2:2017/public/login", user)
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

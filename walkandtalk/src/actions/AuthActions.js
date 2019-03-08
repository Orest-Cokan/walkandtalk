import {
  AUTH_CREATE_USER,
  AUTH_CREATE_USER_FAIL,
  AUTH_CREATE_USER_SUCCESS,
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS
} from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";

export const createUser = (email, password, password2) => {
  const user = {
    email: email,
    password: password,
    password2: password2
  };
  return dispatch => {
    dispatch({ type: AUTH_CREATE_USER });
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

const createUserFail = dispatch => {
  dispatch({ type: AUTH_CREATE_USER_FAIL });
};

const createUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_CREATE_USER_SUCCESS,
    payload: user
  });

  Actions.app();
};

export const loginUser = (email, password) => {
  const user = {
    email: email,
    password: password
  };
  return dispatch => {
    dispatch({ type: AUTH_LOGIN_USER });
    console.log(email, password);
    axios
      .post("http://10.0.2.2:2017/public/login", user)
      .then(res => {
        if (res.status === 200) {
          console.log(res.status);
          loginUserSuccess(dispatch, res.data);
          console.log(res.data);
        }
      })
      .catch(err => {
        loginUserFail(dispatch);
        console.log(err);
      });
  };
};

const loginUserFail = dispatch => {
  dispatch({ type: AUTH_LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.app();
};

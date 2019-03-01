import {
  AUTH_CREATE_USER,
  AUTH_CREATE_USER_FAIL,
  AUTH_CREATE_USER_SUCCESS,
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS
} from "./types";
import firebase from "@firebase/app";
import "@firebase/auth";
import { Actions } from "react-native-router-flux";

export const createUser = (email, password) => {
  return dispatch => {
    dispatch({ type: AUTH_CREATE_USER });

    const tmpString = email.split("@");
    const username = tmpString[0];

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => createUserSuccess(dispatch, user))
      .then(() => {
        const { currentUser } = firebase.auth();
        try {
          console.log(email, password);
          firebase
            .database()
            .firestore()
            .collection("User")
            .doc(email)
            .set({
              fullname: username,
              email,
              username,
              password,
              userpic:
                "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png",
              intensity,
              location
            });
        } catch (error) {
          alert(error);
        }
      })
      .catch(() => createUserFail(dispatch));
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
  return dispatch => {
    dispatch({ type: AUTH_LOGIN_USER });
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
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

import {
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_CREATE_FAIL,
  USER_CREATE_SUCCESS,
  USER_CREATE,
  USER_EDIT,
  USER_LOGIN_SUCCESS,
  SET_USER,
  SET_ALL_USERS,
  GET_UNREGISTERED_USERS,
  USER_APPROVE,
  USER_DECLINE
} from "../actions/types";

export const INITIAL_STATE = {
  errorLogging: "",
  errorCreating: "",
  loading: false,
  user: "",
  otherUser:'',
  users:[],
  unregisteredUsers: []
};

// user reducer
export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CREATE:
      return {
        ...state,
        ...INITIAL_STATE,
        loading: true,
      };
    case USER_CREATE_FAIL:
      return {
        ...state,
        errorCreating: "Creation failed! Please check the credentials!",
        loading: false
      };
    case USER_CREATE_SUCCESS:
      return { ...state, loading: false, error: ""};
    case USER_LOGIN:
      return {
        ...state,
        ...INITIAL_STATE,
        loading: true,
        user: action.payload
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        errorLogging: "Login failed! Please check the credentials!",
        loading: false
      };
    case USER_EDIT:
      return {
         ...state, 
         ...INITIAL_STATE,
        loading: true,
        user: action.payload
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        loading: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case SET_USER:
      return { ...state, otherUser: action.payload };
    case SET_ALL_USERS:
      return { ...state, users: action.payload };
    case GET_UNREGISTERED_USERS:
      return { ...state, unregisteredUsers: action.payload };
    case USER_APPROVE:
      return { ...state};
    case USER_DECLINE:
      return { ...state};
    default:
      return state;
    
  }
};

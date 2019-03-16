import {
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_CREATE_FAIL,
  USER_CREATE_SUCCESS,
  USER_CREATE,
  USER_EDIT,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  USER_LOGIN_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  errorLoging: "",
  errorCreating: "",
  loading: false,
  user: ""
};

// user reducer
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CREATE:
      return {
        ...state,
        ...INITIAL_STATE,
        loading: true,
        user: action.payload
      };
    case USER_CREATE_FAIL:
      return {
        ...state,
        errorCreating: "Creation failed! Please check the credentials!",
        loading: false
      };
    case USER_CREATE_SUCCESS:
      return { ...state, loading: false, error: "", user: action.payload };
    case USER_LOGIN:
      console.log("reeee", action.payload);
      console.log("reeee", action);
      return {
        ...state,
        ...INITIAL_STATE,
        loading: true,
        user: action.payload
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        errorLoging: "Login failed! Please check the credentials!",
        loading: false
      };
    case USER_EDIT:
      return {
         ...state, 
         ...INITIAL_STATE,
        loading: true,
        user: action.payload 
      
      };
    case USER_EDIT_SUCCESS:
    return {
      ...state, 
      ...INITIAL_STATE,
     loading: true,
     user: action.payload 
   
   };
    case USER_EDIT_FAIL:
      return {
        ...state, 
       errorLoging: "Edit user failed!",
       loading: false,
     };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        loading: true,
        user: action.payload
      };
    default:
      return state;
  }
};

export default user;


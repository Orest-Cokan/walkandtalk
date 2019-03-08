import { combineReducers } from "redux";
import auth from "./AuthReducer";
import event from "./EventReducer";
import profile from "./ProfileReducer";

export default combineReducers({
  auth: auth,
  event: event,
  profile: profile
});

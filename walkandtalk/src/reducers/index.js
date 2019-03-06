import { combineReducers } from "redux";
import auth from "./AuthReducer";
import event from "./EventReducer";
//import profile from "./ProfileReducer";
//import highlight from "./HighlightReducer";

export default combineReducers({
  auth: auth,
  event: event
  //profile: profile,
  //highlight: highlight
});

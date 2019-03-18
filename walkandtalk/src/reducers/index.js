import { combineReducers } from "redux";
import user from "./UserReducer";
import event from "./EventReducer";
import record from "./EventRecordReducer";

// combine all reducers into a single one
export default combineReducers({
  user: user,
  event: event,
  record: record,
});

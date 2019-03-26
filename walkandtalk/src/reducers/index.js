import { combineReducers } from "redux";
import user from "./UserReducer";
import event from "./EventReducer";
import record from "./RecordReducer";
import picture from "./PictureReducer"

// combine all reducers into a single one
export default combineReducers({
  user: user,
  event: event,
  record: record,
  picture: picture
});

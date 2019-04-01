import {
  RECORD_UPDATE,
  SET_RECORDS,
  SET_COMPLETED_RECORDS,
  SET_UNCOMPLETED_RECORDS
} from "../actions/types";

const INITIAL_STATE = {
  records: [],
  updated_record: [],
  completed_records: [],
  uncompleted_records: []
};

// event record reducer
const record = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECORD_UPDATE:
      return { ...state, updated_record: action.payload };
    case SET_RECORDS:
      return { ...state, records: action.payload };
    case SET_COMPLETED_RECORDS:
      return { ...state, completed_records: action.payload };
    case SET_UNCOMPLETED_RECORDS:
      return { ...state, uncompleted_records: action.payload };
    default:
      return state;
  }
};

export default record;

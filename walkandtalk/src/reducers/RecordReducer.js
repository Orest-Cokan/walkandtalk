import {
  SET_RECORDS,
  SET_COMPLETED_RECORDS,
  SET_UNCOMPLETED_RECORDS
} from "../actions/types";

const INITIAL_STATE = {
  records: [],
  completedRecords: [],
  uncompletedRecords: []
};

// event reducer
const record = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_RECORDS:
      return { ...state, records: action.payload };
    case SET_COMPLETED_RECORDS:
      return { ...state, completedRecords: action.payload };
    case SET_UNCOMPLETED_RECORDS:
      return { ...state, uncompletedRecords: action.payload };
    default:
      return state;
  }
};

export default record;

import {
<<<<<<< HEAD
=======
  RECORD_UPDATE,
>>>>>>> 5cd899262b1636db64d0e2f5ac7c3f2b7a836c46
  SET_RECORDS,
  SET_COMPLETED_RECORDS,
  SET_UNCOMPLETED_RECORDS
} from "../actions/types";

const INITIAL_STATE = {
  records: [],
<<<<<<< HEAD
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
=======
  completed_records: [],
  uncompleted_records: []
};

// event record reducer
const record = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECORD_UPDATE:
      return { ...state, records: action.payload };
    case SET_RECORDS:
      return { ...state, records: action.payload };
    case SET_COMPLETED_RECORDS:
      return { ...state, completed_records: action.payload };
    case SET_UNCOMPLETED_RECORDS:
      return { ...state, uncompleted_records: action.payload };
>>>>>>> 5cd899262b1636db64d0e2f5ac7c3f2b7a836c46
    default:
      return state;
  }
};

export default record;

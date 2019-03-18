import {
  EVENT_RECORD_CREATE,
  EVENT_RECORD_UPDATE,
  EVENT_RECORD_UPDATE_SUCCESS,
  EVENT_RECORD_UPDATE_FAIL,
  GET_ALL_EVENT_RECORDS,
  GET_EVENT_RECORDS_BY_USER,
  GET_COMPLETED_EVENT_RECORDS_BY_USER,
  GET_UNCOMPLETED_EVENT_RECORDS_BY_USER } from "../actions/types";

const INITIAL_STATE = {
  records: [],
  completed_records: [],
  uncompleted_records: []

};

// event record reducer
const record = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT_RECORD_CREATE:
      return { ...state, records: action.payload };
    case EVENT_RECORD_UPDATE:
      return { ...state, records: action.payload };
    case EVENT_RECORD_UPDATE_SUCCESS:
      return { ...state, records: action.payload };
    case EVENT_RECORD_UPDATE_FAIL:
      return { ...state, records: action.payload };
    case GET_ALL_EVENT_RECORDS:
      return { ...state, records: action.payload };
    case GET_EVENT_RECORDS_BY_USER:
      return { ...state, records: action.payload };
    case GET_COMPLETED_EVENT_RECORDS_BY_USER:
      return { ...state, completed_records: action.payload };
    case GET_UNCOMPLETED_EVENT_RECORDS_BY_USER:
      return { ...state, uncompleted_records: action.payload };
    default:
      return state;
  }
};

export default record;

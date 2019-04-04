import {
    PICTURE_EDIT,
    PICTURE_GET
  } from "../actions/types";
  
export const INITIAL_STATE = {
    errorLoging: "",
    errorCreating: "",
    loading: false,
    picture: ""
  };

// picture reducer
export const picture = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PICTURE_EDIT:
            return {
            ...state,
            ...INITIAL_STATE,
            loading: true,
            picture: action.payload
        };
        case PICTURE_GET:
            return {
            ...state,
            ...INITIAL_STATE,
            picture: action.payload
        };
        default:
            return state;
    }
};
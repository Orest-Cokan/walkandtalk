import * as types from "../types";

const initialState = {
  email: "",
  password: "",
  dateOfBirth: "",
  intensity: "",
  location: "",
  time: "",
  indoor: false,
  profilePicture: null,
  menopauseStage: null,
  registered: false
};

// UserReducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PROFILE:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

export default userReducer;

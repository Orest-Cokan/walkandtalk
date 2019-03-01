import * as types from "../types";

// Initial model of the a profile
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

// Universal user reducer
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

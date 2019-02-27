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

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PROFILE:
      return { ...state };

    case types.ADD_PROFILE:
      return {};

    default:
      return state;
  }
};

export default userReducer;

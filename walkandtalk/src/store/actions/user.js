import * as types from "../types.js";

export function setProfile(profile) {
  return {
    type: types.SET_PROFILE,
    payload: profile
  };
}

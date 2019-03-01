import * as actions from "../actions/AuthActions"
import * as types from "../actions/types";

// Test if setting a profile works
describe('actions', () => {
    it('should set a profile correctly', () => {
      const profile = {
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
          }
      const expectedAction = {
        type: types.SET_PROFILE,
        payload: profile
      }
      expect(actions.setProfile(profile)).toEqual(expectedAction)
    })
  })
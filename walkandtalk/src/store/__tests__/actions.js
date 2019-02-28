import * as actions from "../actions/actions";
import * as types from "../types";

/* Below are all redux tests */

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
  
// Test if adding a single event works
  describe('actions', () => {
    it('should add a single event', () => {
      const event = {
        title: "Brisk Walking Event!",
        description: "We will head over to the U of A and do some walking!"
          }
      const expectedAction = {
        type: types.ADD_EVENT,
        payload: event
      }
      expect(actions.addEvent(event)).toEqual(expectedAction)
    })
  })

  // Test if setting a single event works
  describe('actions', () => {
    it('should set a single event', () => {
      const event = {
        title: "Brisk Walking Event!",
        description: "We will head over to the U of A and do some walking!"
          }
      const expectedAction = {
        type: types.SET_EVENTS,
        payload: event
      }
      expect(actions.setEvents(event)).toEqual(expectedAction)
    })
  })

  // Test if editting a single event works
  describe('actions', () => {
    it('should edit a single event', () => {
      const event = {
        title: "Brisk Walking Event!",
        description: "We will head over to the U of A and do some walking!"
          }
      const index = undefined;

      const expectedAction = {
        type: types.EDIT_EVENT,
        payload: {
          event,
          index
      }
    }
      expect(actions.editEvent(event)).toEqual(expectedAction)
    })
  })


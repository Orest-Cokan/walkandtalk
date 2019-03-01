import userReducer from "../reducers/userReducer";
import eventReducer from "../reducers/eventReducer";
import * as types from '../types';


/* Below we will be testing around reducers */


// User reducer tests
describe('user reducer', () => {
    // Initial user parameters on sign up
    it('should return the initial state', () => {
      expect(userReducer(undefined, {})).toEqual(
        {
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
      )
    })

    it('should handle SET_PROFILE', () => {
        // Testing of set profile
        expect(
          userReducer([], {
            type: types.SET_PROFILE,
            payload: {
                email: "dank memes",
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
          })
        ).toEqual(
            {
                email: "dank memes",
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
        )
    })

    expect(
        userReducer(
            // Testing match of empty and non empty profiles
            {
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
          ,
          {
            type: types.SET_PROFILE,
            payload: {

                email: "dank memes 2",
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
          }
        )
      ).toEqual(
        {
            email: "dank memes 2",
            password: "",
            dateOfBirth: "",
            intensity: "",
            location: "",
            time: "",
            indoor: false,
            profilePicture: null,
            menopauseStage: null,
            registered: false
        },
        {
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
      )
    })

    // Tests for event reducer
    describe('event reducer', () => {
        it('should return the initial state', () => {
            expect(eventReducer(undefined, {})).toEqual([
            ])
        })

        it('should handle ADD_EVENT', () => {
            expect(
              // Tests add event
              eventReducer([], {
                type: types.ADD_EVENT,
                payload: {
                  title: "title",
                  description: "a description"
                }
              })
            ).toEqual([
              {
                title: "title",
                description: "a description"
              }
            ])
          })
    })
import userReducer from "../reducers/userReducer";
import * as types from '../types';


/* Below we will be testing around reducers */

describe('user reducer', () => {
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
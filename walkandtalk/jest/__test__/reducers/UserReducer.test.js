import * as reducer from '../../../src/reducers/UserReducer';
import * as mockData from '../../__mock__/reducers/UserReducerMockData';
import {
    USER_CREATE,
    USER_CREATE_FAIL,
    USER_CREATE_SUCCESS,
    USER_LOGIN,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_EDIT,
    SET_USER,
    SET_ALL_USERS,
    USER_APPROVE,
    USER_DECLINE,
    GET_UNREGISTERED_USERS
  } from '../../../src/actions/types';


describe('User reducer', () => {

    // Initial state
    it('User reducer | Initial state', () => {
        expect(reducer.user(undefined, {})).toEqual(reducer.INITIAL_STATE);
    });

    // Create user
    it('User reducer | USER_CREATE', () => {
        const createUser = {
            type: USER_CREATE,
            payload: mockData.user, 
        };

        const expectedState = {
            ...reducer.INITIAL_STATE,
            loading: true,
            user: mockData.user
        }

        expect(reducer.user({}, createUser)).toEqual(expectedState);
    });

    // Create user failed
    it('User reducer | USER_CREATE_FAIL', () => {
        const createUserFail = {
            type: USER_CREATE_FAIL,
        };

        const expectedState = {
            errorCreating: "Creation failed! Please check the credentials!",
            loading: false
        }

        expect(reducer.user({}, createUserFail)).toEqual(expectedState);
    });

    // Create user successful
    it('User reducer | USER_CREATE_SUCCESS', () => {
        const createUserSuccess = {
            type: USER_CREATE_SUCCESS,
            payload: mockData.user
        };

        const expectedState = {
            error: "",
            loading: false,
            user: mockData.user
        }

        expect(reducer.user({}, createUserSuccess)).toEqual(expectedState);
    });

    // Login user
    it('User reducer | USER_LOGIN', () => {
        const loginUser = {
            type: USER_LOGIN,
            payload: mockData.user, 
        };

        const expectedState = {
            ...reducer.INITIAL_STATE,
            loading: true,
            user: mockData.user
        }

        expect(reducer.user({}, loginUser)).toEqual(expectedState);
    });


    // Login user fail
    it('User reducer | USER_LOGIN_FAIL', () => {
        const loginUserFail = {
            type: USER_LOGIN_FAIL,
        };

        const expectedState = {
            errorLogging: "Login failed! Please check the credentials!",
            loading: false
        }

        expect(reducer.user({}, loginUserFail)).toEqual(expectedState);
    });

    // Login user success
    it('User reducer | USER_LOGIN_SUCCESS', () => {
        const loginUserSuccess = {
            type: USER_LOGIN_SUCCESS,
            payload: mockData.user
        };

        const expectedState = {
            ...reducer.INITIAL_STATE,
            loading: true,
            user: mockData.user,
        }

        expect(reducer.user({}, loginUserSuccess)).toEqual(expectedState);
    });

    // Edit user
    it('User reducer | USER_EDIT', () => {
        const editUser = {
            type: USER_EDIT,
            payload: mockData.user
        };

        const expectedState = {
            ...reducer.INITIAL_STATE,
            loading: true,
            user: mockData.user,
        }

        expect(reducer.user({}, editUser)).toEqual(expectedState);
    });
    
    // Get all users
    it('User reducer | SET_ALL_USERS', () => {
        const getAllUsers = {
            type: SET_ALL_USERS,
            payload: mockData.all_users, 
        };

        const expectedState = {
            users: mockData.all_users
        }

        expect(reducer.user({}, getAllUsers)).toEqual(expectedState);
    });

    // Get unregistered users
    it('User reducer | GET_UNREGISTERED_USERS', () => {
        const getUnregisteredUsers = {
            type: GET_UNREGISTERED_USERS,
            payload: mockData.unregistered_users, 
        };

        const expectedState = {
            unregisteredUsers: mockData.unregistered_users
        }

        expect(reducer.user({}, getUnregisteredUsers)).toEqual(expectedState);
    });

    // Get a single user
    it('User reducer | SET_USER', () => {
        const getUser = {
            type: SET_USER,
            payload: mockData.user 
        };

        const expectedState = {
            otherUser: mockData.user
        }
        expect(reducer.user({}, getUser)).toEqual(expectedState);
    });

    // Approve user
    it('User reducer | USER_APPROVE', () => {
        const approveUser = {
            type: USER_APPROVE,
        };

        const expectedState = {}

        expect(reducer.user({}, approveUser)).toEqual(expectedState);
    });


    // Decline user
    it('User reducer | USER_DECLINE', () => {
        const declineUser = {
            type: USER_DECLINE,
        };

        const expectedState = {}

        expect(reducer.user({}, declineUser)).toEqual(expectedState);
    });

});
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_EDIT,
  SET_USER,
  SET_ALL_USERS,
  USER_APPROVE,
  USER_DECLINE,
  GET_UNREGISTERED_USERS
} from '../../../src/actions/types';
import * as actions from '../../../src/actions/UserActions';
import * as mockData from '../../__mock__/UserMockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  // Create user
  it('User actions | USER_CREATE', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user: mockData.user },
      });
    });

    const expectedAction = [
      { 
        type: USER_CREATE, 
      }, {
        type: USER_CREATE_SUCCESS,
        payload: mockData.user
      }
    ];

    const store = mockStore({ user: {} })

    return store.dispatch(actions.createUser())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

  // Login user
  it('User actions | USER_LOGIN', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user: mockData.user },
      });
    });

    const expectedAction = [
      { 
        type: USER_LOGIN, 
      }, {
        type: USER_LOGIN_SUCCESS,
        payload: mockData.user
      }
    ];

    const store = mockStore({ user: {} })

    return store.dispatch(actions.loginUser())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

  // Edit user
  it('User actions | USER_EDIT', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user: mockData.user },
      });
    });

    const expectedAction = [
      { 
        type: USER_EDIT,
        payload: mockData.user 
      }
    ];

    const store = mockStore({ user: {} })

    return store.dispatch(actions.editUser())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

  // Get all users
  it('User actions | SET_ALL_USERS', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { users: mockData.all_users },
      });
    });

    const expectedAction = [
      { 
        type: SET_ALL_USERS, 
        payload: mockData.all_users
      }
    ];

    const store = mockStore({ users: {} })

    return store.dispatch(actions.getAllUsers())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

  // Get unregistered users
  it('User actions | GET_UNREGISTERED_USERS', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { users: mockData.unregistered_users },
      });
    });

    const expectedAction = [
      { 
        type: GET_UNREGISTERED_USERS, 
        payload: mockData.unregistered_users
      }
    ];

    const store = mockStore({ users: {} })

    return store.dispatch(actions.getUnregisteredUsers())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

  // Get a single user
  it('User actions | SET_USER', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user: mockData.user },
      });
    });

    const expectedAction = [
      { 
        type: SET_USER, 
        payload: mockData.user
      }
    ];

    const store = mockStore({ user: {} })

    return store.dispatch(actions.getUser())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

  // Approve user
  it('User actions | USER_APPROVE', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user: mockData.user },
      });
    });

    const expectedAction = [
      { 
        type: USER_APPROVE
      }
    ];

    const store = mockStore({ user: {} })

    return store.dispatch(actions.approveUser())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

  // Decline user
  it('User actions | USER_DECLINE', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user: mockData.user },
      });
    });

    const expectedAction = [
      { 
        type: USER_DECLINE
      }
    ];

    const store = mockStore({ user: {} })

    return store.dispatch(actions.declineUser())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

});
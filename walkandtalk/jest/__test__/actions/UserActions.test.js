import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';
import * as UserActions from '../src/actions/UserActions';
import * as types from '../src/actions/types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loginUser', () => {

  beforeEach(function () {
    moxios.install(axios);
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('creates SET_ALL_USERS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData,
      });
    });

    const expectedActions = [
      { type: types.SET_ALL_USERS,
        payload: mockData
      }
    ];

    const store = mockStore({ payload: {} })

    await store.dispatch(UserActions.getAllUsers())
        .then(() => { 
            expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
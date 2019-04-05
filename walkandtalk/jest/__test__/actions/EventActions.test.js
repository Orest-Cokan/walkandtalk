import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
    SET_EVENTS,
    SET_USER_EVENTS,
    EVENT_CREATE,
    EVENT_DELETE,
    EVENT_EDIT
} from '../../../src/actions/types';
import * as actions from '../../../src/actions/EventActions';
import * as mockData from '../../__mock__/EventMockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Event actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  // Create event
  it('Event actions | EVENT_CREATE', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { event: mockData.event },
      });
    });

    const expectedAction = [
      { 
        type: EVENT_CREATE, 
      }
    ];

    const store = mockStore({ event: {} })

    return store.dispatch(actions.createEvent())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

  // Edit event
  it('Event actions | EVENT_EDIT', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { event: mockData.event },
      });
    });

    const expectedAction = [
      {
        type: EVENT_EDIT,
        payload: mockData.event
      }
    ];

    const store = mockStore({ event: {} })

    return store.dispatch(actions.editEvent())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

  // Delete event
  it('Event actions | EVENT_DELETE', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { event: mockData.event },
      });
    });

    const expectedAction = [
      { 
        type: EVENT_DELETE,
        payload: mockData.event 
      }
    ];

    const store = mockStore({ event: {} })

    return store.dispatch(actions.deleteEvent())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

  // Get all events
  it('Event actions | SET_EVENTS', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { events: mockData.all_events },
      });
    });

    const expectedAction = [
      { 
        type: SET_EVENTS, 
        payload: mockData.all_events
      }
    ];

    const store = mockStore({ events: {} })

    return store.dispatch(actions.fetchEvents())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

  // Get all user events
  it('Event actions | SET_USER_EVENTS', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { events: mockData.user_events },
      });
    });

    const expectedAction = [
      { 
        type: SET_USER_EVENTS, 
        payload: mockData.user_events
      }
    ];

    const store = mockStore({ events: {} })

    return store.dispatch(actions.fetchUserEvents())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

});
import * as reducer from '../../../src/reducers/EventReducer';
import * as mockData from '../../__mock__/reducers/EventReducerMockData';
import {
    SET_EVENTS,
    SET_USER_EVENTS,
    EVENT_CREATE,
    EVENT_DELETE,
    EVENT_EDIT
  } from '../../../src/actions/types';

describe('Event reducer', () => {

    // Initial state
    it('Event reducer | Initial state', () => {
        expect(reducer.event(undefined, {})).toEqual(reducer.INITIAL_STATE);
    });

    // Create event
    it('Event reducer | EVENT_CREATE', () => {
        const createEvent = {
            type: EVENT_CREATE,
            payload: mockData.event, 
        };

        const expectedState = {
            event: mockData.event
        }

        expect(reducer.event({}, createEvent)).toEqual(expectedState);
    });

    // Edit event
    it(' Event reducer | EVENT_EDIT', () => {
        const editEvent = {
            type: EVENT_EDIT,
            payload: mockData.event
        };

        const expectedState = {}

        expect(reducer.event({}, editEvent)).toEqual(expectedState);
    });

    // Delete event
    it(' Event reducer | EVENT_DELETE', () => {
        const deleteEvent = {
            type: EVENT_DELETE,
            payload: mockData.event
        };

        const expectedState = {
            event: mockData.event
        }

        expect(reducer.event({}, deleteEvent)).toEqual(expectedState);
    });
    
    // Get all events
    it(' Event reducer | SET_EVENTS', () => {
        const getAllEvents = {
            type: SET_EVENTS,
            payload: mockData.all_events, 
        };

        const expectedState = {
            events: mockData.all_events
        }

        expect(reducer.event({}, getAllEvents)).toEqual(expectedState);
    });

    // Get all user events
    it(' Event reducer | SET_USER_EVENTS', () => {
        const getUserEvents = {
            type: SET_USER_EVENTS,
            payload: mockData.user_events, 
        };

        const expectedState = {
            userEvents: mockData.user_events
        }

        expect(reducer.event({}, getUserEvents)).toEqual(expectedState);
    });
    
});
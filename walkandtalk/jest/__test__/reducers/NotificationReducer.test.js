import * as reducer from '../../../src/reducers/NotificationReducer';
import * as mockData from '../../__mock__/NotificationMockData';
import { 
    NOTIFICATION_CREATE,
    NOTIFICATION_UPDATE,
    SET_NOTIFICATIONS,
    SET_UNREAD_NOTIFICATIONS,
} from '../../../src/actions/types';

describe('Notification reducer', () => {

    // Initial state
    it('Notification reducer | Initial state', () => {
        expect(reducer.notification(undefined, {})).toEqual(reducer.INITIAL_STATE);
    });

    // Create notification
    it('Notification reducer | NOTIFICATION_CREATE', () => {
        const sendNotification = {
            type: NOTIFICATION_CREATE,
            payload: mockData.notification, 
        };

        const expectedState = {
            notification: mockData.notification
        }

        expect(reducer.notification({}, sendNotification)).toEqual(expectedState);
    });

    // Update notification
    it(' Notification reducer | NOTIFICATION_UPDATE', () => {
        const updateNotification = {
            type: NOTIFICATION_UPDATE,
            payload: mockData.notification
        };

        const expectedState = {
            notification: mockData.notification
        }

        expect(reducer.notification({}, updateNotification)).toEqual(expectedState);
    });

    
    // Get notifications by user
    it(' Notification reducer | SET_NOTIFICATIONS', () => {
        const getNotifications = {
            type: SET_NOTIFICATIONS,
            payload: mockData.notifications, 
        };

        const expectedState = {
            notifications: mockData.notifications
        }

        expect(reducer.notification({}, getNotifications)).toEqual(expectedState);
    });

    // Get unread notifications by user
    it(' Notification reducer | SET_UNREAD_NOTIFICATIONS', () => {
        const getUnreadNotifications = {
            type: SET_UNREAD_NOTIFICATIONS,
            payload: mockData.unread_notifications, 
        };

        const expectedState = {
            unread_notifications: mockData.unread_notifications
        }

        expect(reducer.notification({}, getUnreadNotifications)).toEqual(expectedState);
    });
    
});
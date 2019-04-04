import * as reducer from '../../../src/reducers/RecordReducer';
import * as mockData from '../../__mock__/RecordMockData';
import {
    RECORD_UPDATE,
    SET_RECORDS,
    SET_COMPLETED_RECORDS,
    SET_UNCOMPLETED_RECORDS
} from '../../../src/actions/types';


describe('Record reducer', () => {

    // Initial state
    it('Record reducer | Initial state', () => {
        expect(reducer.record(undefined, {})).toEqual(reducer.INITIAL_STATE);
    });

    // Update record
    it(' Record reducer | RECORD_UPDATE', () => {
        const updateRecord = {
            type: RECORD_UPDATE,
            payload: mockData.updated_record
        };

        const expectedState = {
            updated_record: mockData.updated_record
        }

        expect(reducer.record({}, updateRecord)).toEqual(expectedState);
    });

    // Get records by user
    it(' Record reducer | SET_RECORDS', () => {
        const getAllRecords = {
            type: SET_RECORDS,
            payload: mockData.records, 
        };

        const expectedState = {
            records: mockData.records
        }

        expect(reducer.record({}, getAllRecords)).toEqual(expectedState);
    });

    // Get uncompleted records
    it(' Record reducer | SET_UNCOMPLETED_RECORDS', () => {
        const getUncompletedRecords = {
            type: SET_UNCOMPLETED_RECORDS,
            payload: mockData.uncompleted_records, 
        };

        const expectedState = {
            uncompleted_records: mockData.uncompleted_records
        }

        expect(reducer.record({}, getUncompletedRecords)).toEqual(expectedState);
    });
    
    // Get completed records
    it(' Record reducer | SET_COMPLETED_RECORDS', () => {
        const getCompletedRecords = {
            type: SET_COMPLETED_RECORDS,
            payload: mockData.completed_records, 
        };

        const expectedState = {
            completed_records: mockData.completed_records
        }

        expect(reducer.record({}, getCompletedRecords)).toEqual(expectedState);
    });
    
});
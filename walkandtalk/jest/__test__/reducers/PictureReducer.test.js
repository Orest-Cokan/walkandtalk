import * as reducer from '../../../src/reducers/PictureReducer';
import * as mockData from '../../__mock__/reducers/PictureReducerMockData';
import {
    PICTURE_EDIT,
    PICTURE_GET
}  from '../../../src/actions/types';


describe('Picture reducer', () => {

    // Initial state
    it('Picture reducer | Initial state', () => {
        expect(reducer.picture(undefined, {})).toEqual(reducer.INITIAL_STATE);
    });

    // Edit picture
    it('Picture reducer | PICTURE_EDIT', () => {
        const editPicture = {
            type: PICTURE_EDIT,
            payload: mockData.picture
        };

        const expectedState = {
            ...reducer.INITIAL_STATE,
            loading: true,
            picture: mockData.picture,
        }

        expect(reducer.picture({}, editPicture)).toEqual(expectedState);
    });
    
    // Get picture
    it('Picture reducer | PICTURE_GET', () => {
        const getPicture = {
            type: PICTURE_GET,
            payload: mockData.picture 
        };

        const expectedState = {
            ...reducer.INITIAL_STATE,
            picture: mockData.picture
        }
        expect(reducer.picture({}, getPicture)).toEqual(expectedState);
    });
});
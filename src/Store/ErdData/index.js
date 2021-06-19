import {createAction, handleActions} from 'redux-actions'

const WORKING_ERD = 'ErdData/WORKING_ERD'

export const assignWorkingErd = createAction(WORKING_ERD);

export const initialState = {
    erdId: -1,
    erdName: '',
    commitId: -1,
    erdData: {},
    ownerId: '',
};

const ErdDataReducer = handleActions({
    [WORKING_ERD]: (state, action) => {
        return Object.assign({}, state, action.payload);
    },
}, initialState);

export default ErdDataReducer;
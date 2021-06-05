import {createAction, handleActions} from 'redux-actions'

const CURRENT_ERD = 'VuerdData/CURRENT_ERD'

export const assignCurrentErd = createAction(CURRENT_ERD);

export const initialState = {
    editor: {}
};

const VuerdDataReducer = handleActions({
    [CURRENT_ERD]: (state, action) => {
        return Object.assign({}, state, action.payload);
    },
}, initialState)

export default VuerdDataReducer;
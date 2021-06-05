import {createAction, handleActions} from 'redux-actions'

const LOGIN = 'User/LOGIN';
const LOGOUT = 'User/LOGOUT';

export const onGoogleLogin = createAction(LOGIN);
export const onGoogleLogout = createAction(LOGOUT);

export const initalState = {
    id: 0,
    email: '',
    name: '',
    imageURL: '',
    expires_in: 0,
    hashedEmail: '',
    accessToken: '',
    refreshToken: '',
}

const UserReducer = handleActions({
    [LOGIN]: (state, action) => {
        return Object.assign({}, state, action.payload);
    },
    [LOGOUT]: (state) => {
        return initalState
    },
}, initalState);

export default UserReducer;
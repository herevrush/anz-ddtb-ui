import * as actionTypes from '../../actions/actionTypes';
import userReducer from '../User';
import { USER } from '../../actions/mocks/axios';
import { FEEDBACK_SUCCESS, FEEDBACK_ERROR, FEEDBACK_TYPE_LOGIN } from '../../Constants';

const initialState = {
    authenticated: false,
    user: null,
    loading: false,
    feedback: null,
    feedbackType: null,
    feedbackMessage: null,
};

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, initialState)).toEqual(initialState);
    });

    it('clear feedback', () => {
        expect(userReducer(initialState, {
            type: actionTypes.CLEAR_USER_FEEDBACK,
        })).toEqual({
            ...initialState,
            feedback: null,
            feedbackType: null,
            feedbackMessage: null,
        });
    });

    it('login success', () => {
        expect(userReducer(initialState, {
            type: actionTypes.LOGIN_USER,
            user: USER,
        })).toEqual({
            ...initialState,
            authenticated: true,
            loading: false,
            user: USER,
            feedback: FEEDBACK_SUCCESS,
            feedbackType: FEEDBACK_TYPE_LOGIN,
            feedbackMessage: `You're successfully logged in!`,
        });
    });

    it('login failed', () => {
        expect(userReducer(initialState, {
            type: actionTypes.LOGIN_USER_FAILED,
            error: "error",
        })).toEqual({
            ...initialState,
            authenticated: false,
            user: null,
            loading: false,
            feedback: FEEDBACK_ERROR,
            feedbackType: FEEDBACK_TYPE_LOGIN,
            feedbackMessage: `Login Failed. error.`
        });
    });
});
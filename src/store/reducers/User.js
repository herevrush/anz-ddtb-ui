import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../Utils";
import {
    ACCESS_TOKEN,
    FEEDBACK_ERROR,
    FEEDBACK_TYPE_LOGIN,
    FEEDBACK_SUCCESS,
} from "../Constants";

const initialState = {
    authenticated: false,
    user: null,
    // authenticated: true,
    // user: {
    //     name: 'John Smith',
    //     username: 'john123',
    //     token: '12345'
    // },
    loading: false,
    feedback: null,
    feedbackType: null,
    feedbackMessage: null,
};

const startLoading = (state) => {
    return updateObject(state, {
        loading: true,
    });
};


const handleLogout = (state, action) => {
    localStorage.removeItem(ACCESS_TOKEN);
    return updateObject(state, {
        authenticated: false,
        user: null,
    });
};

const handleLoginFailed = (state, action) => {
    return updateObject(state, {
        authenticated: false,
        user: null,
        loading: false,
        feedback: FEEDBACK_ERROR,
        feedbackType: FEEDBACK_TYPE_LOGIN,
        feedbackMessage: `Login Failed. ${action.error}.`,
    });
};


const handleLogin = (state, action) => {
    // localStorage.setItem(ACCESS_TOKEN, action.accessToken);
    return updateObject(state, {
        authenticated: true,
        loading: false,
        user: action.user,
        feedback: FEEDBACK_SUCCESS,
        feedbackType: FEEDBACK_TYPE_LOGIN,
        feedbackMessage: `You're successfully logged in!`,
    });
};

const clearFeedback = (state, action) => {
    return updateObject(state, {
        feedback: null,
        feedbackType: null,
        feedbackMessage: null,
    });
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGOUT_USER:
            return handleLogout(state, action);
        case actionTypes.LOGIN_USER_FAILED:
            return handleLoginFailed(state, action);
        case actionTypes.LOGIN_USER:
            return handleLogin(state, action);
        case actionTypes.USER_LOADING_STARTED:
            return startLoading(state);
        case actionTypes.CLEAR_USER_FEEDBACK:
            return clearFeedback(state, action);
        default:
            return state;
    }
};

export default userReducer;
import * as actionTypes from "./actionTypes";
import { ACCESS_TOKEN } from "../Constants";
import { getAuthHeaders, getHeaders } from "../Utils";
import axios from "axios";


export const loginUserSuccess = (user) => {
    return {
        type: actionTypes.LOGIN_USER,
        user: user,
    };
};

export const loginUserFailed = (error) => {
    return {
        type: actionTypes.LOGIN_USER_FAILED,
        error: error,
    };
};
export const logoutUser = () => {
    return {
        type: actionTypes.LOGOUT_USER,
    };
};

export const clearUserFeedback = () => {
    return {
        type: actionTypes.CLEAR_USER_FEEDBACK,
    };
};
export const setUserLoadingStarted = () => {
    return {
        type: actionTypes.USER_LOADING_STARTED,
    };
};


export const loginUser = (loginRequest) => {
    return (dispatch) => {
        dispatch(setUserLoadingStarted());
        axios
            .post(`http://localhost:5001/auth/login`, loginRequest)
            .then((response) => {
                dispatch(loginUserSuccess(response.data.user));
            })
            .catch((error) => {
                dispatch(loginUserFailed(error.message));
            });
    };
};  
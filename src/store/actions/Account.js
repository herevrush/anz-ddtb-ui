import axios from "axios";
import * as actionTypes from "./actionTypes";

export const accountLoadSuccess = (accounts) => {
    return {
        type: actionTypes.ACCOUNTS_LOADED,
        accounts: accounts,
    };
};

export const accountAddSuccess = (account) => {
    return {
        type: actionTypes.ACCOUNT_ADDED,
        account: account,
    };
};

export const accountLoadFailed = (error) => {
    return {
        type: actionTypes.ACCOUNTS_LOAD_FAILED,
        error: error,
    };
};
export const setAccountsLoadingStarted = () => {
    return {
        type: actionTypes.ACCOUNT_LOADING_STARTED,
    };
};


export const clearFeedback = () => {
    return {
        type: actionTypes.CLEAR_ACCOUNT_FEEDBACK,
    };
};
export const loadAccounts = (username) => {
    return (dispatch) => {
        dispatch(setAccountsLoadingStarted());
        axios
            .get(`http://localhost:6002/accounts/${username}`)
            .then((response) => {
                dispatch(accountLoadSuccess(response.data.accounts));
            })
            .catch((error) => {
                dispatch(accountLoadFailed(error.message));
            });
    };
};

export const addNewAccount = (accountData) => {
    return (dispatch) => {
        dispatch(setAccountsLoadingStarted());
        axios
            .post(`http://localhost:6002/accounts/`, accountData)
            .then((response) => {
                accountData["status"] = "Pending";
                dispatch(accountAddSuccess(accountData));
            })
            .catch((error) => {
                dispatch(accountLoadFailed(error.message));
            });
    };
};  
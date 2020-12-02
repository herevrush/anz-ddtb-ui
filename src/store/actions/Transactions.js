import axios from "axios";
import * as actionTypes from "./actionTypes";
import { TRANSACTIONS_ENDPOINT } from "../Weburls";

export const transactionsLoadSuccess = (accountNumber, transactions) => {
    return {
        type: actionTypes.TRANS_LOADED,
        accountNumber: accountNumber,
        transactions: transactions,
    };
};

export const transactionsLoadFailed = (accountNumber, error) => {
    return {
        type: actionTypes.TRANS_LOAD_FAILED,
        error: error,
        accountNumber: accountNumber
    };
};
export const setTransactionsLoadingStarted = () => {
    return {
        type: actionTypes.TRANS_LOADING_STARTED,
    };
};


export const clearTransFeedback = () => {
    return {
        type: actionTypes.CLEAR_TRANS_FEEDBACK,
    };
};
export const loadTransactions = (accountNumber) => {
    return (dispatch) => {
        dispatch(setTransactionsLoadingStarted());
        return axios
            .get(`${TRANSACTIONS_ENDPOINT}/${accountNumber}`)
            .then((response) => {
                dispatch(transactionsLoadSuccess(accountNumber, response.data.transactions));
            })
            .catch((error) => {
                dispatch(transactionsLoadFailed(accountNumber, error.message));
            });
    };
};  
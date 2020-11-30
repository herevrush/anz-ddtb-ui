import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../Utils";
import {
    FEEDBACK_ERROR,
    FEEDBACK_TYPE_TRANSACTIONS,
    FEEDBACK_SUCCESS,
} from "../Constants";

const initialState = {
    transactions: [],
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

const loadTransactions = (state, action) => {
    const trans = { ...state.transactions };
    trans[action.accountNumber] = action.transactions;
    return updateObject(state, {
        loading: false,
        transactions: trans,
        feedback: FEEDBACK_SUCCESS,
        feedbackType: FEEDBACK_TYPE_TRANSACTIONS,
        feedbackMessage: null
    });
};

const loadTransactionsFailed = (state, action) => {
    const trans = { ...state.transactions };
    trans[action.accountNumber] = null;
    return updateObject(state, {
        transactions: trans,
        loading: false,
        feedback: FEEDBACK_ERROR,
        feedbackType: FEEDBACK_TYPE_TRANSACTIONS,
        feedbackMessage: `Could not load transactions for account number ${action.accountNumber}. ${action.error}.`,
    });
}

const clearFeedback = (state, action) => {
    return updateObject(state, {
        feedback: null,
        feedbackType: null,
        feedbackMessage: null,
    });
};

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TRANS_LOADED:
            return loadTransactions(state, action);
        case actionTypes.TRANS_LOAD_FAILED:
            return loadTransactionsFailed(state, action);
        case actionTypes.ACCOUNT_LOADING_STARTED:
            return startLoading(state);
        case actionTypes.CLEAR_TRANS_FEEDBACK:
            return clearFeedback(state, action);
        default:
            return state;
    }
};

export default transactionsReducer;
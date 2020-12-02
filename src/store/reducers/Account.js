import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../Utils";
import {
    FEEDBACK_ERROR,
    FEEDBACK_TYPE_ACCOUNTS,
    FEEDBACK_SUCCESS,
} from "../Constants";

const initialState = {
    accounts: [],
    loading: false,
    feedback: null,
    feedbackType: null,
    feedbackMessage: null,
    accountTypes: [
        { name: "Savings Account", value: "SAVINGS" },
        { name: "Everyday Account", value: "EVERYDAY" },
        { name: "Loan Account", value: "LOAN" }
    ],
};

const startLoading = (state) => {
    return updateObject(state, {
        loading: true,
    });
};

const loadAccounts = (state, action) => {
    return updateObject(state, {
        loading: false,
        accounts: action.accounts,
        feedback: FEEDBACK_SUCCESS,
        feedbackType: FEEDBACK_TYPE_ACCOUNTS,
        feedbackMessage: null
    });
};
const addAccount = (state, action) => {
    const accounts = [...state.accounts, action.account];
    return updateObject(state, {
        loading: false,
        accounts: accounts,
        feedback: FEEDBACK_SUCCESS,
        feedbackType: FEEDBACK_TYPE_ACCOUNTS,
        feedbackMessage: null
    });
};


const loadAccountsFailed = (state, action) => {
    return updateObject(state, {
        accounts: [],
        loading: false,
        feedback: FEEDBACK_ERROR,
        feedbackType: FEEDBACK_TYPE_ACCOUNTS,
        feedbackMessage: `Could not load accounts. ${action.error}.`,
    });
}

const clearFeedback = (state, action) => {
    return updateObject(state, {
        feedback: null,
        feedbackType: null,
        feedbackMessage: null,
    });
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACCOUNTS_LOADED:
            return loadAccounts(state, action);
        case actionTypes.ACCOUNTS_LOAD_FAILED:
            return loadAccountsFailed(state, action);
        case actionTypes.ACCOUNT_LOADING_STARTED:
            return startLoading(state);
        case actionTypes.CLEAR_ACCOUNT_FEEDBACK:
            return clearFeedback(state, action);
        case actionTypes.ACCOUNT_ADDED:
            return addAccount(state, action);
        default:
            return state;
    }
};

export default accountReducer;
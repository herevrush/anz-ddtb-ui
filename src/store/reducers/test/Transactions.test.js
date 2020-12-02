import * as actionTypes from '../../actions/actionTypes';
import transactionsReducer from '../Transactions';
import { TRANSACTIONS } from '../../actions/mocks/axios';
import { FEEDBACK_ERROR, FEEDBACK_SUCCESS, FEEDBACK_TYPE_TRANSACTIONS } from '../../Constants';

const initialState = {
    transactions: [],
    loading: false,
    feedback: null,
    feedbackType: null,
    feedbackMessage: null,
};

describe('transactions reducer', () => {

    it('should return the initial state', () => {
        expect(transactionsReducer(undefined, {})).toEqual(initialState);
    });

    it('clear feedback', () => {
        expect(transactionsReducer(initialState, {
            type: actionTypes.CLEAR_TRANS_FEEDBACK,
        })).toEqual({
            ...initialState,
            feedback: null,
            feedbackType: null,
            feedbackMessage: null,
        });
    });

    it('transactions started loading', () => {
        expect(transactionsReducer(initialState, {
            type: actionTypes.TRANS_LOADING_STARTED,
        })).toEqual({
            ...initialState,
            loading: true
        });
    });
    it('load transactions', () => {
        const trans = {};
        trans["123"] = TRANSACTIONS;
        expect(transactionsReducer(initialState, {
            type: actionTypes.TRANS_LOADED,
            accountNumber: 123,
            transactions: TRANSACTIONS,
        })).toEqual({
            ...initialState,
            transactions: trans,
            feedback: FEEDBACK_SUCCESS,
            feedbackType: FEEDBACK_TYPE_TRANSACTIONS,
            feedbackMessage: null,
        });
    });
    it('load transactions failed', () => {
        const trans = {};
        trans["123"] = null;
        expect(transactionsReducer(initialState, {
            type: actionTypes.TRANS_LOAD_FAILED,
            error: "error",
            accountNumber: 123,
        })).toEqual({
            ...initialState,
            transactions: trans,
            feedback: FEEDBACK_ERROR,
            feedbackType: FEEDBACK_TYPE_TRANSACTIONS,
            feedbackMessage: "Could not load transactions for account number 123. error.",
        });
    });
});

import * as actionTypes from '../../actions/actionTypes';
import accountReducer from '../Account';
import { ACCOUNTS, ADD_ACCOUNT } from '../../actions/mocks/axios';
import { FEEDBACK_SUCCESS, FEEDBACK_TYPE_ACCOUNTS, FEEDBACK_ERROR } from '../../Constants';


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
    ]
};
describe('account reducer', () => {

    it('should return the initial state', () => {
        expect(accountReducer(undefined, initialState)).toEqual(initialState);
    });

    it('clear feedback', () => {
        expect(accountReducer(initialState, {
            type: actionTypes.CLEAR_ACCOUNT_FEEDBACK,
        })).toEqual({
            ...initialState,
            feedback: null,
            feedbackType: null,
            feedbackMessage: null,
        });
    });
    it('account started loading', () => {
        expect(accountReducer(initialState, {
            type: actionTypes.ACCOUNT_LOADING_STARTED,
        })).toEqual({
            ...initialState,
            loading: true
        });
    });
    it('load account', () => {
        expect(accountReducer(initialState, {
            type: actionTypes.ACCOUNTS_LOADED,
            accounts: ACCOUNTS,
        })).toEqual({
            ...initialState,
            accounts: ACCOUNTS,
            feedback: FEEDBACK_SUCCESS,
            feedbackType: FEEDBACK_TYPE_ACCOUNTS,
            feedbackMessage: null,
        });
    });
    it('load account failed', () => {
        expect(accountReducer(initialState, {
            type: actionTypes.ACCOUNTS_LOAD_FAILED,
            error: "error",
        })).toEqual({
            ...initialState,
            feedback: FEEDBACK_ERROR,
            feedbackType: FEEDBACK_TYPE_ACCOUNTS,
            feedbackMessage: "Could not load accounts. error.",
        });
    });


    it('add account ', () => {
        const state = { ...initialState, accounts: ACCOUNTS };
        const accounts = [...ACCOUNTS, ADD_ACCOUNT];
        expect(accountReducer(state, {
            type: actionTypes.ACCOUNT_ADDED,
            account: ADD_ACCOUNT,
        })).toEqual({
            ...initialState,
            loading: false,
            accounts: accounts,
            feedback: FEEDBACK_SUCCESS,
            feedbackType: FEEDBACK_TYPE_ACCOUNTS,
            feedbackMessage: null
        });
    });
});
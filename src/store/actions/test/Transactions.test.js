import { mount, shallow } from 'enzyme';
import React from 'react';
import * as actionTypes from "../actionTypes";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect'
import * as actions from "../Transactions";
import { LOGIN_REQUEST_DATA, USER, TRANSACTIONS } from '../mocks/axios';
import fetchMock from 'fetch-mock';
import { TRANSACTIONS_ENDPOINT } from '../../Weburls';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
describe('transaction action', () => {

    it('should clear transactions feedback.', () => {
        const expectedAction = {
            type: actionTypes.CLEAR_TRANS_FEEDBACK,
        };
        expect(actions.clearTransFeedback()).toEqual(expectedAction);
    });

    it('transactions loading started ', () => {
        const expectedAction = {
            type: actionTypes.TRANS_LOADING_STARTED,
        };
        expect(actions.setTransactionsLoadingStarted()).toEqual(expectedAction);
    });



    it('transactions failed', () => {
        const expectedAction = {
            type: actionTypes.TRANS_LOAD_FAILED,
            error: "error",
            accountNumber: 123
        };
        expect(actions.transactionsLoadFailed(123, "error")).toEqual(expectedAction);
    });

    it('transactions success', () => {
        const expectedAction = {
            type: actionTypes.TRANS_LOADED,
            accountNumber: 123,
            transactions: TRANSACTIONS,
        };
        expect(actions.transactionsLoadSuccess(123, TRANSACTIONS)).toEqual(expectedAction);
    });
    afterEach(() => {
        fetchMock.restore();
    })
    it('load transactions', () => {

        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);
        const mockState = {
            t: {
                transactions: [],
                loading: false,
                feedback: null,
                feedbackType: null,
                feedbackMessage: null,
            }
        };

        const store = mockStore(mockState);
        var mock = new MockAdapter(Axios);
        mock.onGet(`${TRANSACTIONS_ENDPOINT}/234565657`).reply(200, {
            transactions: TRANSACTIONS
        });
        const expectedActions = [
            actions.setTransactionsLoadingStarted(),
            actions.transactionsLoadSuccess("234565657", TRANSACTIONS)
        ];
        return store.dispatch(actions.loadTransactions("234565657")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });


});
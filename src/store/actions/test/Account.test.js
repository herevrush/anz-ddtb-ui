import { mount, shallow } from 'enzyme';
import React from 'react';
import * as actionTypes from "../actionTypes";
import Account, { clearFeedback, accountLoadSuccess, accountAddSuccess, accountLoadFailed, setAccountsLoadingStarted } from '../Account';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ACCOUNTS } from '../mocks/axios';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ACCOUNTS_ENDPOINT } from '../../Weburls';
import * as actions from "../Account";
describe('Account action', () => {
    beforeEach(() => {
        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);
    });
    it('should clear feedback ', () => {
        const expectedAction = {
            type: actionTypes.CLEAR_ACCOUNT_FEEDBACK,
        };
        expect(clearFeedback()).toEqual(expectedAction);
    });

    it('get accounts success ', () => {
        const expectedAction = {
            type: actionTypes.ACCOUNTS_LOADED,
            accounts: ACCOUNTS
        };
        expect(accountLoadSuccess(ACCOUNTS)).toEqual(expectedAction);
    });
    it('add accounts success ', () => {
        let account = {
            "accountType": true,
            "name": true,
        };
        const expectedAction = {
            type: actionTypes.ACCOUNT_ADDED,
            account: account
        };
        expect(accountAddSuccess(account)).toEqual(expectedAction);
    });

    it('add accounts success ', () => {
        let error = {
            message: "failed"
        };
        const expectedAction = {
            type: actionTypes.ACCOUNTS_LOAD_FAILED,
            error: error
        };
        expect(accountLoadFailed(error)).toEqual(expectedAction);
    });

    it('loading started - account ', () => {
        const expectedAction = {
            type: actionTypes.ACCOUNT_LOADING_STARTED,
        };
        expect(setAccountsLoadingStarted()).toEqual(expectedAction);
    });
    it('load accounts', () => {
        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);
        const mockState = {
            a: {
                authenticated: false,
                user: null,
                loading: false,
                feedback: null,
                feedbackType: null,
                feedbackMessage: null,
            }
        };
        const store = mockStore(mockState);
        var mock = new MockAdapter(Axios);
        mock.onGet(`${ACCOUNTS_ENDPOINT}/123`).reply(200, {
            accounts: [{
                id: 234565657,
                type: 'SAVINGS',
                name: 'personal',
                current_balance: 1234.455,
                available_funds: 1224.455,
            }]
        });

        const expectedActions = [
            actions.setAccountsLoadingStarted(),
            actions.accountLoadSuccess(ACCOUNTS)
        ];
        return store.dispatch(actions.loadAccounts(123)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
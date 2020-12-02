import { mount, shallow } from 'enzyme';
import React from 'react';
import * as actionTypes from "../actionTypes";
import Account, { clearFeedback } from '../Account';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect'
import * as actions from "../User";
import { LOGIN_REQUEST_DATA, USER } from '../mocks/axios';
import fetchMock from 'fetch-mock';
import { LOGIN_ENDPOINT } from '../../Weburls';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
describe('User action', () => {

    it('should clear user feedback ', () => {
        const expectedAction = {
            type: actionTypes.CLEAR_USER_FEEDBACK,
        };
        expect(actions.clearUserFeedback()).toEqual(expectedAction);
    });

    it('user loading started ', () => {
        const expectedAction = {
            type: actionTypes.USER_LOADING_STARTED,
        };
        expect(actions.setUserLoadingStarted()).toEqual(expectedAction);
    });

    it('logout user', () => {
        const expectedAction = {
            type: actionTypes.LOGOUT_USER,
        };
        expect(actions.logoutUser()).toEqual(expectedAction);
    });

    it('login user failed', () => {
        const expectedAction = {
            type: actionTypes.LOGIN_USER_FAILED,
        };
        expect(actions.loginUserFailed()).toEqual(expectedAction);
    });
    it('login user', () => {
        const expectedAction = {
            type: actionTypes.LOGIN_USER,
            user: USER
        };
        expect(actions.loginUserSuccess(USER)).toEqual(expectedAction);
    });
    afterEach(() => {
        fetchMock.restore();
    })
    it('Login user success', () => {

        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);
        const mockState = {
            u: {
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
        mock.onPost(LOGIN_ENDPOINT, LOGIN_REQUEST_DATA).reply(200,
            {
                message: "logged in successfully", user: {
                    name: "John Smith",
                    username: "john123",
                    token: "12345"
                }
            });


        const expectedActions = [
            actions.setUserLoadingStarted(),
            actions.loginUserSuccess(USER)
        ];
        return store.dispatch(actions.loginUser(LOGIN_REQUEST_DATA)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });

    });


});
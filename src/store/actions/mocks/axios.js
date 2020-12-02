import { LOGIN_ENDPOINT } from "../../Weburls";

export const USER = {
    name: "John Smith",
    username: "john123",
    token: "12345"
};

export const ACCOUNTS = [{
    id: 234565657,
    type: 'SAVINGS',
    name: 'personal',
    current_balance: 1234.455,
    available_funds: 1224.455,
}];

export const TRANSACTIONS = [{
    id: 764574231,
    date: "10/10/2020",
    description: "repayment",
    debit: 1000.00,
    credit: 0,
    balance: 560000.250
}];
export const ADD_ACCOUNT = {
    id: 12345,
    type: 'SAVINGS',
    name: 'personal',
    current_balance: 1234.455,
    available_funds: 1224.455,
};
export const LOGIN_REQUEST_DATA = { "username": "john123", "password": "sample" };
export const LOGIN_ERROR = {
    error: "Login failed try again."
};

const mock = {
    get: jest.fn((url, { id }) => {
        switch (url) {
            case LOGIN_ENDPOINT:
                if (id === LOGIN_REQUEST_DATA) {
                    return Promise.resolve(USER);
                }
                return Promise.reject(LOGIN_ERROR);
            default:
                return Promise.reject({ error: 'Not Found' });
        }
    })
};

export default mock;
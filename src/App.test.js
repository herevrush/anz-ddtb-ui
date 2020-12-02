import { render, screen } from '@testing-library/react';
import App from './App';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { Typography } from '@material-ui/core';
import renderer from 'react-test-renderer';
import Main from './containers/Main/Main';
import LoginForm from './components/LoginPage/LoginForm/LoginForm';
const mockStore = configureStore();
const initialState = {
    a: {
        accounts: null,
        loading: false,
        feedback: null,
        feedbackType: null,
        feedbackMessage: null,
        accountTypes: [
            { name: "Savings Account", value: "SAVINGS" },
            { name: "Everyday Account", value: "EVERYDAY" },
            { name: "Loan Account", value: "LOAN" }
        ],
    },
    t: {
        transactions: [],
        loading: false,
        feedback: null,
        feedbackType: null,
        feedbackMessage: null,
    },
    u: {
        authenticated: false,
        user: null,
        loading: false,
        feedback: null,
        feedbackType: null,
        feedbackMessage: null,
    },
};
let store;
let component
beforeEach(() => {
    store = mockStore(initialState);
    component = renderer.create(
        <Provider store={store}>
            <App />
        </Provider>
    );
});

test('renders login on start', () => {
    const testInstance = component.root;
    const instance = testInstance.instance;
    const testElem = (<Typography variant="h6" align="center" color="primary">
        <strong>Login</strong>
    </Typography>);
    // expect(component.toJSON()).toMatchSnapshot();
    expect(testInstance.find(node => node.type === Typography).props.children.type).toEqual('strong');
    expect(testInstance.findByType(LoginForm)).toBeTruthy();
    // expect(testInstance.findByType(LoginForm)).toHaveLength(4);
    // console.assert(testInstance.find(node => node.type === Typography).props.children.type === 'strong');
    // console.assert(testInstance.findByType(LoginForm).length === 1);
    // expect(testInstance.findByType(LoginForm).length === 4).
    // expect(component.findByType(strong).children).findBychildren).toEqual("Login");
});


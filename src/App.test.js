import { render, screen } from '@testing-library/react';
import App from './App';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { Typography } from '@material-ui/core';
import renderer from 'react-test-renderer';
import Main from './containers/Main/Main';
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
    // wrapper = shallow(<Main />);
    store = mockStore(initialState);
    component = renderer.create(
        <Provider store={store}>
            <App />
        </Provider>
    );
});

test('renders login on start', () => {
    // console.log(component.toJSON());
    expect(component.toJSON()).toMatchSnapshot();
});


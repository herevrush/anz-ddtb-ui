import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { Typography } from '@material-ui/core';
import Login from './Login';
import { render } from '../../test-utils';
import { screen } from '@testing-library/react';
import LoginForm from '../../../components/LoginPage/LoginForm/LoginForm';

describe('<Login />', () => {
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
    beforeEach(() => {

    });
    // const store = mockStore(initialState);
    test('renders login on start', () => {
        const wrapper = render(<Login />, { initialState: initialState });
        const inputNode = screen.getAllByText(/Login/i);
        const testElem = (<Typography variant="h6" align="center" color="primary">
            <strong>Login</strong>
        </Typography>);
        expect(screen.getAllByText(/Login/i)).toBeTruthy();
        expect(screen.getAllByText(/Username/)).toBeTruthy();
        expect(screen.getAllByText(/Password/)).toBeTruthy();
    });


});



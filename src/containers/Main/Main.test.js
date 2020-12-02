import { Typography } from '@material-ui/core';
import { screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { render } from '../test-utils';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';

describe('<Main />', () => {
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
        const wrapper = render(<BrowserRouter basename="/"><Main /></BrowserRouter>, { initialState: initialState });
        const inputNode = screen.getAllByText(/Login/i);
        const testElem = (<Typography variant="h6" align="center" color="primary">
            <strong>Login</strong>
        </Typography>);

        // console.log(inputNode);
        // console.log(wrapper.find(testElem)).toBeInTheDocument();
        expect(screen.getAllByText(/Login/i)).toBeTruthy();
        expect(screen.getAllByText(/Username/)).toBeTruthy();
        expect(screen.getAllByText(/Password/)).toBeTruthy();
    });


});



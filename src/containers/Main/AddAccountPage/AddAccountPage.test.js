import { screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { ACCOUNTS } from '../../../store/actions/mocks/axios';
import { render } from '../../test-utils';
import AddAccountPage from './AddAccountPage';

describe('<AccountsPage />', () => {
    const mockStore = configureStore();
    const initialState = {
        a: {
            accounts: ACCOUNTS,
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
            authenticated: true,
            user: {
                name: 'John Smith',
                username: 'john123',
                token: '12345'
            },
            loading: false,
            feedback: null,
            feedbackType: null,
            feedbackMessage: null,
        },
    };
    beforeEach(() => {

    });
    // const store = mockStore(initialState);
    test('renders account details on start', () => {
        const wrapper = render(<AddAccountPage />, { initialState: initialState });
        expect(screen.getAllByText(/Add New Account/i)).toBeTruthy();
    });


});



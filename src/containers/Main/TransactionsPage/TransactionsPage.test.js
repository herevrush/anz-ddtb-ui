import { screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { ACCOUNTS, TRANSACTIONS } from '../../../store/actions/mocks/axios';
import { render } from '../../test-utils';
import TransactionsPage from './TransactionsPage';
describe('<TransactionsPage />', () => {
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
            transactions: { "234565657": TRANSACTIONS },
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
    test('renders transaction details on start', () => {
        const wrapper = render(<TransactionsPage match={{ params: { accountNumber: 234565657 } }} />, { initialState: initialState });
        expect(screen.getByText(/Transactions for Account Number:234565657/i)).toBeTruthy();
    });


});



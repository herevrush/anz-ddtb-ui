import { TableBody, Typography } from '@material-ui/core';
import { shallow } from 'enzyme';
import React from 'react';
import { ACCOUNTS, TRANSACTIONS, USER } from '../../store/actions/mocks/axios';
import Transaction from './Transaction/Transaction';
import TransactionsList from './TransactionsList';

describe('<TransactionsList />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<TransactionsList transactions={{ 234565657: null }} accountNumber="234565657" currentUser={USER} />);
    });
    it('should render no elements ', () => {
        const elem = (<Typography variant="h6" align="center" color="secondary">No Transactions found.</Typography>);
        expect(wrapper.find(Transaction)).toHaveLength(0);
        expect(wrapper.find(Typography)).toHaveLength(2);
        expect(wrapper.find(TableBody)).toHaveLength(0);
        expect(wrapper.contains(elem)).toBeTruthy();

    });

    it('should render 1 transaction ', () => {
        let trans = { 234565657: TRANSACTIONS };
        wrapper.setProps({ transactions: trans });
        const elem = (<Typography variant="h6" align="center" color="secondary">No Transactions found.</Typography>);
        expect(wrapper.find(Transaction)).toHaveLength(1);
        expect(wrapper.find(TableBody)).toHaveLength(1);
        expect(wrapper.contains(elem)).toBeFalsy();
    });

});
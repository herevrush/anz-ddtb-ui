import { Button, Chip, TableRow, TableCell } from '@material-ui/core';
import { shallow } from 'enzyme';
import React from 'react';
import { TRANSACTIONS, USER } from '../../../store/actions/mocks/axios';
import Transaction from './Transaction';

describe('<Transaction />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Transaction transaction={TRANSACTIONS[0]} accountNumber="234565657" currentUser={USER} />);
    });
    it('should render one element ', () => {
        expect(wrapper.find(TableCell)).toHaveLength(5);
        expect(wrapper.find(TableRow)).toHaveLength(1);
    });



});
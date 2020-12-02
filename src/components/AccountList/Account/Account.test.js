import { Chip, TableRow, Button } from '@material-ui/core';
import { shallow } from 'enzyme';
import React from 'react';
import { ACCOUNTS, USER } from '../../../store/actions/mocks/axios';
import Account from './Account';

describe('<Account />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Account account={ACCOUNTS[0]} currentUser={USER} />);
    });
    it('should render one element ', () => {
        expect(wrapper.find(Chip)).toHaveLength(1);
        expect(wrapper.find(TableRow)).toHaveLength(1);
        // expect(wrapper.contains(Button)).toBeTruthy();
        expect(wrapper.find(Button)).toHaveLength(1);
    });



});
import { mount, shallow } from 'enzyme';
import React from 'react';
import AccountList from './AccountList';
import { ACCOUNTS, USER } from '../../store/actions/mocks/axios';
import { FEEDBACK_SUCCESS, FEEDBACK_TYPE_ACCOUNTS } from '../../store/Constants';
import { Typography, TableBody } from '@material-ui/core';
import toJson from 'enzyme-to-json';
import Account from './Account/Account';

describe('<AccountList />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<AccountList accounts={[]} currentUser={USER} />);
    });
    it('should render no elements ', () => {
        const elem = (<Typography variant="h6" align="center" color="secondary">No Accounts found.</Typography>);
        expect(wrapper.find(Account)).toHaveLength(0);
        expect(wrapper.find(Typography)).toHaveLength(2);
        expect(wrapper.find(TableBody)).toHaveLength(0);
        expect(wrapper.contains(elem)).toBeTruthy();

    });

    it('should render 1 account ', () => {
        wrapper.setProps({ accounts: ACCOUNTS });
        const elem = (<Typography variant="h6" align="center" color="secondary">No Accounts found.</Typography>);
        expect(wrapper.find(Account)).toHaveLength(1);
        expect(wrapper.find(TableBody)).toHaveLength(1);
        expect(wrapper.contains(elem)).toBeFalsy();
    });

});
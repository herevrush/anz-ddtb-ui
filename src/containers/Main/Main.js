import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Login from './Login/Login';
import NotFound from '../NotFound/NotFound';
import AccountsPage from './AccountsPage/AccountsPage';
import TransactionsPage from './TransactionsPage/TransactionsPage';
import AddAccountPage from './AddAccountPage/AddAccountPage';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
class Main extends Component {

    render() {
        return (
            <Container component="main" maxWidth="md">
                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/accounts"
                        authenticated={this.props.authenticated}
                        loading={this.props.loading}
                        component={AccountsPage} />
                    <PrivateRoute path="/transactions/:accountNumber"
                        authenticated={this.props.authenticated}
                        loading={this.props.loading} component={TransactionsPage} />
                    <PrivateRoute path="/account/new"
                        authenticated={this.props.authenticated}
                        loading={this.props.loading}
                        component={AddAccountPage} />
                    <Route exact path="/" render={() => <Redirect to="/login" />} />
                    <Route component={NotFound}></Route>
                </Switch>
            </Container>

        );
    }
}

const mapStateToProps = (state, history) => {
    return {
        currentUser: state.u.user,
        authenticated: state.u.authenticated,
        loading: state.u.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

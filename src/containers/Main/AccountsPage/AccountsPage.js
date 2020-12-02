import React, { Component } from 'react';
import { Container, Grid, Button } from "@material-ui/core";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import AccountList from '../../../components/AccountList/AccountList';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import Axios from 'axios';

class AccountsPage extends Component {


    componentDidMount() {
        if (this.props.accounts.length === 0 && this.props.currentUser) {
            this.props.onLoadAccounts(this.props.currentUser.username);
        }
    }
    loadTransactionsHandler = (accountNumber) => {
        this.props.history.push(`/transactions/${accountNumber}`);
    };

    addNewAccountHandler = () => {
        this.props.history.push(`/account/new`);
    };

    render() {
        let siteContent = <Spinner />;
        if (this.props.accounts) {
            siteContent = (
                <AccountList
                    {...this.props}
                    loadTransactionsHandler={(accountNumber) => this.loadTransactionsHandler(accountNumber)}
                />
            );
        }
        return (
            <Container component="main" maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {siteContent}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => this.addNewAccountHandler()}
                        >
                            Add New Account
        </Button>
                    </Grid>

                </Grid>
            </Container>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.u.user,
        authenticated: state.u.authenticated,
        accounts: state.a.accounts,
        loading: state.a.loading,
        feedback: state.a.feedback,
        feedbackType: state.a.feedbackType,
        feedbackMessage: state.a.feedbackMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadAccounts: (username) => dispatch(actions.loadAccounts(username)),
        onClearFeedback: () => dispatch(actions.clearFeedback()),
        onViewTransactions: (accountNumber) => dispatch(actions.loadTransactions(accountNumber)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(AccountsPage, Axios));
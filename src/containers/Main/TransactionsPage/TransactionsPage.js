import React, { Component } from 'react';
import Spinner from "../../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { Grid, Container } from '@material-ui/core';
import TransactionsList from '../../../components/TransactionsList/TransactionsList';


class TransactionsPage extends Component {

    showAccounts = () => {
        this.props.history.push(`/accounts`);
    };

    componentDidMount() {
        const accountNumber = this.props.match.params.accountNumber;
        if (!this.props.account || this.props.account.id !== accountNumber) {
            this.props.onViewTransactions(accountNumber);
        }
    }

    render() {
        let siteContent = <Spinner />;
        if (this.props.accountNumber && this.props.transactions && this.props.transactions[this.props.accountNumber]) {
            siteContent = (
                <TransactionsList
                    {...this.props}
                    showAccounts={this.showAccounts}
                />
            );
        }
        return (
            <Container component="main" maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {siteContent}
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let accountNumber = null;
    if (ownProps.match.params.accountNumber) {
        accountNumber = ownProps.match.params.accountNumber;
    }
    return {
        currentUser: state.u.user,
        accountNumber: accountNumber,
        authenticated: state.u.authenticated,
        accounts: state.a.accounts,
        transactions: state.t.transactions,
        loading: state.t.loading,
        feedback: state.t.feedback,
        feedbackType: state.t.feedbackType,
        feedbackMessage: state.t.feedbackMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearFeedback: () => dispatch(actions.clearTransFeedback()),
        onViewTransactions: (accountNumber) => dispatch(actions.loadTransactions(accountNumber)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);


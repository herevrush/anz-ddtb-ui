import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAccount from '../../../components/AddAccount/AddAccount';
import { Message } from '../../../components/UI/Message/Message';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from "../../../store/actions/index";
import { FEEDBACK_ERROR, FEEDBACK_TYPE_ACCOUNTS } from '../../../store/Constants';

class AddAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = { open: true };
    }
    showAccounts = () => {
        this.props.history.push(`/accounts`);
    };

    onAddAccount = (data) => {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        this.props.onAddAccount(data);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.accounts !== this.props.accounts
        ) {
            this.props.onClearFeedback();
            this.showAccounts();
        }
    }
    render() {
        let siteContent = <Spinner />;
        let message = "";

        if (
            this.props.feedback === FEEDBACK_ERROR &&
            this.props.feedbackType === FEEDBACK_TYPE_ACCOUNTS
        ) {
            message = (
                <Message
                    open={this.state.open}
                    feedback={this.props.feedback}
                    feedbackMessage={this.props.feedbackMessage}
                    handleClose={this.clearFeedback}
                    duration={5000}
                />
            );
        }
        if (this.props.isAuthenticated) {
            siteContent = <AddAccount showAccounts={this.showAccounts}
                onSubmit={(data, username) => this.onAddAccount(data, username)} />;
        }
        return (
            <Container component="main" maxWidth="sm">
                {siteContent} {message}
            </Container>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.u.user,
        isAuthenticated: state.u.authenticated,
        accounts: state.a.accounts,
        feedbackMessage: state.a.feedbackMessage,
        feedback: state.a.feedback,
        feedbackType: state.a.feedbackType,
        loading: state.a.loading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAddAccount: (accountData) => dispatch(actions.addNewAccount(accountData)),
        onClearFeedback: () => dispatch(actions.clearFeedback()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAccountPage);


import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import LoginPage from "../../../components/LoginPage/LoginPage";
import { Message } from "../../../components/UI/Message/Message";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from "../../../store/actions/index";
import { FEEDBACK_SUCCESS, FEEDBACK_TYPE_LOGIN } from "../../../store/Constants";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { open: true };
    }
    onLoginUser = (data) => {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        this.props.onLoginUser(data);
    };

    componentDidUpdate() {
        if (!this.state.open && this.props.feedbackType === FEEDBACK_TYPE_LOGIN) {
            this.setState({ open: true });
        }
        // if (this.state.open &&
        //     this.props.feedbackType === FEEDBACK_TYPE_LOGIN
        //     && this.props.feedback === FEEDBACK_ERROR
        //     && !this.props.isAuthenticated) {
        //     this.clearFeedback();
        // }
    }
    clearFeedback = () => {
        const feedback = this.props.feedback;
        this.props.onClearLoginFeedback();
        if (feedback === FEEDBACK_SUCCESS) {
            if (this.state.open) {
                this.setState({ open: false });
            }
            this.props.history.push("/accounts");
        }
    };
    render() {
        let siteContent = <Spinner />;
        let message = "";
        if (this.props.isAuthenticated) {
            siteContent = <Redirect to="/accounts" />;
        } else {
            siteContent = <LoginPage onSubmit={(data) => this.onLoginUser(data)} />;
        }

        if (
            this.props.feedback != null &&
            this.props.feedbackType === FEEDBACK_TYPE_LOGIN
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
        return (
            <Container component="main" maxWidth="md">
                {siteContent} {message}
            </Container>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.u.user,
        isAuthenticated: state.u.authenticated,
        feedbackMessage: state.u.feedbackMessage,
        feedback: state.u.feedback,
        feedbackType: state.u.feedbackType,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLoginUser: (loginData) => dispatch(actions.loginUser(loginData)),
        onClearLoginFeedback: () => dispatch(actions.clearUserFeedback()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component } from "react";
import Aux from "../Aux";
import { Message } from "../../components/UI/Message/Message";

const ErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        };
        componentDidMount() {
            this.reqInterceptors = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(
                (res) => res,
                (error) => {
                    this.setState({ error: error });
                }
            );
        }

        componentWillUnmount() {
            // console.log("removing ..." + this.resInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        render() {
            return (
                <Aux>
                    <Message
                        show={this.state.error}
                        feedback="error"
                        handleClose={this.errorConfirmedHandler}
                        feedbackMessage={
                            this.state.error ? this.state.error.message + " - " : null
                        }
                    />
                    {/* <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal> */}
                    {/**/}
                    <WrappedComponent
                        {...this.props}
                        error={this.state.error ? this.state.error.message : null}
                    />
                </Aux>
            );
        }
    };
};

export default ErrorHandler;

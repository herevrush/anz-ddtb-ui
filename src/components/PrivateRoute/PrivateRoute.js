import React from "react";
import { Route, Redirect } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
const PrivateRoute = ({ component: Component, ...rest }) => {
    if (!rest.authenticated && rest.loading) {
        return <Spinner />;
    }
    if (rest.authenticated || rest.loading) {
        return (
            <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
        );
    } else {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: rest.location },
                }}
            />
        );
    }
};

export default PrivateRoute;

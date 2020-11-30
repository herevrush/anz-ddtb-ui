import { Button, Grid } from "@material-ui/core";
import React from "react";
import { reduxForm } from "redux-form";
import { ReduxInput } from "../../UI/Form/ReduxInput/ReduxInput";
import Validate from "./Validate";

let LoginForm = (props) => {
    const { handleSubmit } = props;
    const form = (
        <form onSubmit={handleSubmit} >
            <Grid container spacing={2} alignItems="center" alignContent="center">
                <Grid item xs={12}>
                    <ReduxInput
                        type="input"
                        name="username"
                        label="Username"

                    />
                </Grid>
                <Grid item xs={12}>
                    <ReduxInput
                        type="input"
                        inputType="password"
                        name="password"
                        label="Password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth color="primary">
                        Login
          </Button>
                </Grid>
            </Grid>
        </form>
    );
    return <>{form}</>;
};
LoginForm = reduxForm({
    form: "LoginForm",
    validate: Validate,
    initialValues: {},
})(LoginForm);
export default LoginForm;

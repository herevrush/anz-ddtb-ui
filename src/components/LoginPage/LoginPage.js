import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import LoginForm from "./LoginForm/LoginForm";

const LoginPage = (props) => {
    return (
        <Container component="main" maxWidth="sm">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center" color="primary">
                        <strong>Login</strong>
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <LoginForm {...props} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPage;

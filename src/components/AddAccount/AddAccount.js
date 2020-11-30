import { Button, CircularProgress, Grid, Typography, LinearProgress } from '@material-ui/core';
import React from 'react';
import AddAccountForm from './AddAccountForm/AddAccountForm';

const AddAccount = (props) => {
    let progress = "";
    if (props.loading) {
        progress = <LinearProgress />;
    }
    return (

        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => props.showAccounts()}
                >
                    Show Accounts
  </Button>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="h6" align="center" color="primary">
                    <strong>Add New Account</strong>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <AddAccountForm {...props} onSubmit={props.onSubmit} />
            </Grid>
            {progress}
        </Grid>

    )
}

export default AddAccount

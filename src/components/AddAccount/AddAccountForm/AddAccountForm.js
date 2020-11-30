import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ReduxInput } from '../../UI/Form/ReduxInput/ReduxInput';
import Validate from './Validate';

let AddAccountForm = (props) => {
    const {
        accountTypes,
        handleSubmit,
        reset,
        submitting,
        pristine,
        valid,
    } = props;
    const form = (
        <form onSubmit={handleSubmit} >
            <Grid container spacing={2} alignItems="center" alignContent="center">
                <Grid item xs={12}>
                    <ReduxInput name="username" type="input" inputType="hidden" />
                    <ReduxInput
                        name="type"
                        label="Account Type"
                        type="select"
                        options={accountTypes}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ReduxInput
                        type="input"
                        name="name"
                        label="Name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained"
                        disabled={submitting || pristine || !valid}
                        color="primary">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );

    return (
        <>{form}</>
    )
}
AddAccountForm = reduxForm({
    form: "AddAccountForm",
    enableReinitialize: true,
    validate: Validate,
})(AddAccountForm);
AddAccountForm = connect((state) => {
    const accountTypes = state.a.accountTypes;
    return {
        accountTypes: accountTypes,
        initialValues: { username: state.u.user.username }
    };
})(AddAccountForm);
export default AddAccountForm;

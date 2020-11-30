import { IconButton, makeStyles, Snackbar, SnackbarContent } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import React from "react";
import { FEEDBACK_ERROR } from "../../../store/Constants";

export const useStyles = makeStyles((theme) => ({
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    success: {
        backgroundColor: theme.palette.success,
    },
}));
export const Message = (props) => {
    const classes = useStyles();
    const icon =
        props.feedback === FEEDBACK_ERROR ? <ErrorIcon /> : <CheckCircleIcon />;
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            autoHideDuration={props.duration ? props.duration : 2000}
            open={props.open}
            onClose={props.handleClose}
        >
            <SnackbarContent
                className={
                    props.feedback === FEEDBACK_ERROR ? classes.error : classes.success
                }
                message={
                    <span id="errorMessage" className={classes.message}>
                        {icon}
                        {props.feedbackMessage}
                    </span>
                }
                action={
                    <IconButton
                        size="small"
                        color="inherit"
                        aria-label="close"
                        onClick={props.handleClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                }
            ></SnackbarContent>
        </Snackbar>
    );
};

import React from 'react'
import { FEEDBACK_TYPE_ACCOUNTS, FEEDBACK_ERROR } from "../../store/Constants";
import { Message } from '../UI/Message/Message';
import { Grid, Typography, TableCell, TableHead, TableRow, Table, TableBody } from '@material-ui/core';
import Account from './Account/Account';

const AccountList = (props) => {
    const [open, setOpen] = React.useState(false);
    const closeMessage = () => {
        props.onClearFeedback();
        setOpen(false);
    };
    if (!open && props.feedbackType === FEEDBACK_TYPE_ACCOUNTS && props.feedback === FEEDBACK_ERROR) {
        setOpen(true);
    }
    let elem = (
        <Grid item xs={12} md={11} lg={12}>
            <Typography variant="h6" align="center" color="secondary">
                No Accounts found.
          </Typography>
        </Grid>
    );
    let tableHeader = null;
    let tableElements = null;
    if (props.accounts.length > 0) {
        tableHeader = (
            <TableHead >
                <TableRow>
                    <TableCell >
                        <Typography variant="subtitle2">Account Number</Typography>
                    </TableCell>
                    <TableCell >
                        <Typography variant="subtitle2">Account Type</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2">Name</Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="subtitle2">Current Balance</Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="subtitle2">Available Funds</Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="subtitle2"> </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
        );

        tableElements = props.accounts.map((account, index) => {
            return <Account account={account} key={index} {...props}></Account>;
        });
        elem = (<Table
            size="small"
        >
            {tableHeader}
            <TableBody>{tableElements}</TableBody>
        </Table>);
    }
    return (
        <div>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center" color="primary">
                        Welcome {props.currentUser.name}
                    </Typography>
                </Grid>
                {elem}
            </Grid>
            <Message
                open={open}
                feedback={props.feedback}
                feedbackMessage={props.feedbackMessage}
                handleClose={closeMessage}
            />
        </div>
    )
}

export default AccountList

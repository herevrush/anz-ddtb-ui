import React from 'react'
import { FEEDBACK_TYPE_TRANSACTIONS, FEEDBACK_ERROR } from '../../store/Constants';
import { Grid, Typography, TableHead, TableRow, TableCell, TableBody, Table, Button } from '@material-ui/core';
import Transaction from './Transaction/Transaction';
import { Message } from '../UI/Message/Message';

const TransactionsList = (props) => {
    const [open, setOpen] = React.useState(false);
    const closeMessage = () => {
        props.onClearFeedback();
        setOpen(false);
    };
    if (!open && props.feedbackType === FEEDBACK_TYPE_TRANSACTIONS && props.feedback === FEEDBACK_ERROR) {
        setOpen(true);
    }
    let elem = (
        <Grid item xs={12} md={11} lg={12}>
            <Typography variant="h6" align="center" color="secondary">
                No Transactions found.
          </Typography>
        </Grid>
    );
    let tableHeader = null;
    let tableElements = null;
    let transactions = props.transactions[props.accountNumber];
    if (transactions.length > 0) {
        tableHeader = (
            <TableHead>
                <TableRow>
                    <TableCell >
                        <Typography variant="subtitle2">Date</Typography>
                    </TableCell>
                    <TableCell >
                        <Typography variant="subtitle2">Description</Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="subtitle2">Debit</Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="subtitle2">Credit</Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="subtitle2">Balance</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
        );

        tableElements = transactions.map((transaction) => {
            return <Transaction transaction={transaction} key={transaction.id} {...props}></Transaction>;
        });
        elem = (<Table
            size="small">
            {tableHeader}
            <TableBody>{tableElements}</TableBody>
        </Table>);
    }
    return (
        <div>

            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => props.showAccounts(props.currentUser.id)}
                    >
                        Show Accounts
  </Button>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h6" align="center" color="primary">
                        Transactions for Account Number:{props.accountNumber}
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

export default TransactionsList;

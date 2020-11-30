import { Button, Chip, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';

const Account = (props) => {
    const accountId = props.account.id ? props.account.id : props.account.status;
    const viewBtn = props.account.id ? (<Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => props.loadTransactionsHandler(props.account.id)}
    >
        View Transactions &gt;
    </Button>) : "";
    return (
        <TableRow key={props.account.id}>
            <TableCell component="th" scope="row" size="small" padding="none" >
                <Chip
                    color="primary"
                    label={accountId}
                    variant="outlined"
                    size="small"
                    align="left"
                />
            </TableCell>
            <TableCell component="th" scope="row" size="small" padding="none" >
                <Typography variant="subtitle2" align="left" color="primary">
                    {props.account.type.toLowerCase()}
                </Typography>
            </TableCell>
            <TableCell component="th" scope="row" size="small" padding="none">
                <Typography variant="subtitle2" align="left" color="primary" >
                    {props.account.name}
                </Typography>
            </TableCell>
            <TableCell component="th" scope="row" size="small" >
                <Typography variant="subtitle2" align="left" color="primary" padding="none">
                    {props.account.current_balance ? `$ ${props.account.current_balance}` : ""}
                </Typography>
            </TableCell>
            <TableCell component="th" scope="row" size="small" >
                <Typography variant="subtitle2" align="left" color="primary">
                    {props.account.available_funds ? `$ ${props.account.available_funds}` : ""}
                </Typography>
            </TableCell>
            <TableCell component="th" scope="row" padding="none" >
                {viewBtn}
            </TableCell>
        </TableRow>

    )
}

export default Account;

import React from 'react'
import { TableCell, TableRow, Chip, Typography } from '@material-ui/core';

const Transaction = (props) => {
    const debit = (props.transaction.debit > 0) ? props.transaction.debit : "";
    const credit = (props.transaction.credit > 0) ? props.transaction.credit : "";
    return (
        <TableRow key={props.transaction.id}>
            <TableCell component="th" scope="row" size="small" padding="none" >
                <Typography variant="subtitle2" align="left" color="primary">
                    {props.transaction.date}
                </Typography>
            </TableCell>
            <TableCell component="th" scope="row" size="small" >
                <Typography variant="subtitle2" align="left" color="primary">
                    {props.transaction.description}
                </Typography>
            </TableCell>
            <TableCell component="th" scope="row">
                <Typography variant="subtitle2" align="left" color="primary">
                    {debit}
                </Typography>
            </TableCell>
            <TableCell component="th" scope="row">
                <Typography variant="subtitle2" align="left" color="primary">
                    {credit}
                </Typography>
            </TableCell>
            <TableCell component="th" scope="row"  >
                <Typography variant="subtitle2" align="left" color="primary">
                    ${props.transaction.balance}
                </Typography>
            </TableCell>
        </TableRow>
    )
}

export default Transaction;

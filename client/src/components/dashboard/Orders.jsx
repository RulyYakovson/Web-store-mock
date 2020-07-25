import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from "@material-ui/core/CircularProgress";
import Title from '../Title';

const useStyles = makeStyles((theme) => ({
    progress: {
        color: '#3f51b5',
        position: 'absolute',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const Orders = ({orders, isLoading, tableHeight, tableSize, loaderTop, withName = false}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            {isLoading && <CircularProgress size={36} className={classes.progress} style={{top: loaderTop}}/>}
            <Table size={tableSize} style={{maxHeight: tableHeight}}>
                <TableHead style={{fontFamily: "fantasy"}}>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        {withName && <TableCell>Name</TableCell>}
                        <TableCell>Ship To</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders && orders.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.created && new Date(row.created).toDateString()}</TableCell>
                            {withName && <TableCell>{row.name}</TableCell>}
                            <TableCell>{row.shipTo}</TableCell>
                            <TableCell>{row.paymentMethod}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
};

export default Orders;
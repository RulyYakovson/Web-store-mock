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
    orders: {
        height: theme.spacing(29),
    },
    progress: {
        color: '#3f51b5',
        position: 'absolute',
        top: '75%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const Orders = ({orders, isLoading}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            {isLoading && <CircularProgress size={36} className={classes.progress}/>}
            <Table size="small" className={classes.orders}>
                <TableHead style={{fontFamily: "fantasy"}}>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Ship To</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders && orders.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.created && new Date(row.created).toDateString()}</TableCell>
                            <TableCell>{row.name}</TableCell>
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
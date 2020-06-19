import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {connect} from "react-redux";
import {fetchOrders} from "../../actions/paymentAction";

const useStyles = makeStyles((theme) => ({
    orders: {
        height: theme.spacing(29),
    },
}));

const Orders = ({dispatch, orders, isLoading}) => {
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            <Table size="small" className={classes.orders}>
                <TableHead>
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
}
export default connect(store => ({
    orders: store.orders.orders,
    isLoading: store.orders.isLoading
}))(Orders);
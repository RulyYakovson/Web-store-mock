import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Orders from "../dashboard/Orders";
import {fetchUserOrders} from "../../actions/fetchUserOrdersAction";
import userOrders from "../../reducers/userOrdersReducer";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const UserHistoryTable = ({userId, orders, isLoading, dispatch}) => {
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchUserOrders(userId));
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Orders
                        orders={orders}
                        isLoading={isLoading}
                        tableHeight='460px'
                        tableSize='medium'
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default connect(store => ({
    orders: store.userOrders.orders,
    isLoading: store.userOrders.isLoading
}))(UserHistoryTable);
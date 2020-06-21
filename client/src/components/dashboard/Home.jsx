import React, {useEffect} from "react";
import clsx from "clsx";
import Orders from "./Orders";
import Chart from "./Chart";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {fetchOrders} from "../../actions/paymentAction";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const Home = ({orders, isLoading, dispatch}) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                    <Chart
                        orders={orders}
                        isLoading={isLoading}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Orders
                        orders={orders}
                        isLoading={isLoading}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default connect(store => ({
    orders: store.orders.orders,
    isLoading: store.orders.isLoading
}))(Home);
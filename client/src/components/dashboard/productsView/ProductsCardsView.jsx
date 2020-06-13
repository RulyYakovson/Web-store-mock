import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {fetchProducts} from "../../../actions/productsActions";
import ProductCard from "./ProductCard";
import {Backdrop, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const ProductsCardsView = ({products, setProductsNum, dispatch, isLoading}) => {
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <Container maxWidth="md" component="main">
            <Grid container justify="flex-start" alignItems="flex-end" spacing={products && products.length > 0 ? 5 : 0} >
                <Backdrop className={classes.backdrop} open={isLoading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {
                    products && products.map(product =>
                        <Grid key={product.name} item md={3} xs={6}>
                            <ProductCard product={product} setProductsNum={setProductsNum}/>
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    );
};

export default connect(store => ({
    products: store.products && store.products.products,
    isLoading: store.products.isLoading
}))(ProductsCardsView);

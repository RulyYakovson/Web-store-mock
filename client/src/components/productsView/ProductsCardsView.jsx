import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import {fetchProducts} from "../../actions/productsActions";
import ProductCard from "./ProductCard";
import {Backdrop, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ProductsFilter from "./ProductsFilter";
import {isEmpty} from "lodash";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    empty: {
        color: '#3f51b5',
        padding: theme.spacing(25),
        textAlignLast: "center",
        width: "100%"
    }
}));

const ProductsCardsView = ({products, setProductsNum, dispatch, isLoading}) => {
    const classes = useStyles();

    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    return (
        <div>
            <ProductsFilter products={products} setFilteredProducts={setFilteredProducts}/>
            <Grid container justify="flex-start" alignItems="flex-end" spacing={5}>
                <Backdrop className={classes.backdrop} open={isLoading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {
                    filteredProducts && !isEmpty(filteredProducts) ? filteredProducts.map(product =>
                        <Grid key={product.name} item md={true} xs={8}>
                            <ProductCard product={product} setProductsNum={setProductsNum}/>
                        </Grid>
                    ) : <p className={classes.empty}>No items to show  &#9785;</p>
                }
            </Grid>
        </div>
    );
};

export default connect(store => ({
    products: store.products && store.products.products,
    isLoading: store.products.isLoading
}))(ProductsCardsView);

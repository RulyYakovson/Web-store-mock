import React, {useEffect} from "react";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {fetchProducts} from "../../../actions/productsActions";
import ProductCard from "./ProductCard";

const ProductsCardsView = ({products, dispatch}) => {

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return ( // TODO: Add Loader
        <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
                {
                    products && products.map(product =>
                            <Grid key={product.name} item md={3} xs={6}>
                                <ProductCard product={product}/>
                            </Grid>
                    )
                }
                {
                    products && products.map(product =>
                        <Grid key={product.name} item md={3} xs={6}>
                            <ProductCard product={product}/>
                        </Grid>
                    )
                }
                {
                    products && products.map(product =>
                        <Grid key={product.name} item md={3} xs={6}>
                            <ProductCard product={product}/>
                        </Grid>
                    )
                }
                {
                    products && products.map(product =>
                        <Grid key={product.name} item md={3} xs={6}>
                            <ProductCard product={product}/>
                        </Grid>
                    )
                }
                {
                    products && products.map(product =>
                        <Grid key={product.name} item md={3} xs={6}>
                            <ProductCard product={product}/>
                        </Grid>
                    )
                }
                {
                    products && products.map(product =>
                        <Grid key={product.name} item md={3} xs={6}>
                            <ProductCard product={product}/>
                        </Grid>
                    )
                }
                {
                    products && products.map(product =>
                        <Grid key={product.name} item md={3} xs={6}>
                            <ProductCard product={product}/>
                        </Grid>
                    )
                }
                {
                    products && products.map(product =>
                        <Grid key={product.name} item md={3} xs={6}>
                            <ProductCard product={product}/>
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

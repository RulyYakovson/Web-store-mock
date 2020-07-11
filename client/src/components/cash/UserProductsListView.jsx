import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {PRODUCTS_KEY} from "../../utils/constants";
import ProductListView from "./ProductListView";

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 462,
    }
}));

const UserProductsListView = ({products, setTotalPrice}) => {
    const classes = useStyles();
    const [productsMap, setProductsMap] = useState(new Map(JSON.parse(localStorage.getItem(PRODUCTS_KEY))));

    useEffect(() => {
        setProductsMap(new Map(JSON.parse(localStorage.getItem(PRODUCTS_KEY))))
    }, []);

    const handleDeleteItem = (id) => {
        const productsMap = new Map(JSON.parse(localStorage.getItem(PRODUCTS_KEY)));
        productsMap.delete(id);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(Array.from(productsMap)));
        setProductsMap(productsMap);
    };

    let totalPrice = 0;
    const productsItems = []
    productsMap.forEach((amount, id) => {
        const product = products && products.find(p => p.id === id);
        const price = product && product.price * amount;
        totalPrice += price;
        productsItems.push(
            <ProductListView
                product={product}
                price={price}
                amount={amount}
                handleDeleteItem={handleDeleteItem}
            />
        )
    });
    setTotalPrice(totalPrice);

    return (
        <List className={classes.root}>
            {productsItems}
        </List>
    );
};

export default UserProductsListView;
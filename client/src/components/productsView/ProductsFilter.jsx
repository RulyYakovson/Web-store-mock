import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import Chip from '@material-ui/core/Chip';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {cloneDeep} from "lodash";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(4),
        '& > *': {
            margin: theme.spacing(2),
        },
    },
}));

const ProductsFilter = ({products, setFilteredProducts}) => {
    const classes = useStyles();

    const [fromCheapest, setFromCheapest] = useState(false);
    const [fromExpensive, setFromExpensive] = useState(false);
    const [onlySale, setOnlySale] = useState(false);
    const [onlyNew, setOnlyNew] = useState(false);

    const filter = (onlySale, onlyNew, fromCheapest, fromExpensive) => {
        let filteredProducts = cloneDeep(products);
        if (onlySale) {
            filteredProducts = filteredProducts.filter(p => p.isSale);
        }
        if (onlyNew) {
            filteredProducts = filteredProducts.filter(p => p.isNewProduct);
        }
        if (fromCheapest) {
            filteredProducts.sort((a,b) => a.price - b.price);
        } else if (fromExpensive) {
            filteredProducts.sort((a,b) => b.price - a.price);
        }
        setFilteredProducts(filteredProducts);
    };

    return (
        <div className={classes.root}>
            <Chip
                label="From expensive to cheapest"
                color={fromExpensive ? "primary" : "textSecondary"}
                clickable={!fromExpensive}
                onClick={() => {
                    setFromCheapest(false);
                    setFromExpensive(true);
                    filter(onlySale, onlyNew, false, true);
                }}
                onDelete={() => {
                    setFromExpensive(false);
                    filter(onlySale, onlyNew, fromCheapest, false);
                }}
                icon={<ArrowDownwardIcon />}
            />
            <Chip
                label="From cheapest to expensive"
                color={fromCheapest ? "primary" : "textSecondary"}
                clickable={!fromCheapest}
                onClick={() => {
                    setFromExpensive(false);
                    setFromCheapest(true);
                    filter(onlySale, onlyNew, true, false);
                }}
                onDelete={() => {
                    setFromCheapest(false);
                    filter(onlySale, onlyNew, false, fromCheapest);
                }}
                icon={<ArrowUpwardIcon />}
            />
            <Chip
                label="Only new items"
                color={onlyNew ? "primary" : "textSecondary"}
                clickable={!onlyNew}
                onClick={() => {
                    setOnlyNew(true);
                    filter(onlySale, true, fromCheapest, fromExpensive);
                }}
                onDelete={() => {
                    setOnlyNew(false);
                    filter(onlySale, false, fromCheapest, fromExpensive);
                }}
                icon={<FiberNewIcon />}
            />
            <Chip
                label="Only items is sale"
                color={onlySale ? "primary" : "textSecondary"}
                clickable={!onlySale}
                onClick={() => {
                    setOnlySale(true);
                    filter(true, onlyNew, fromCheapest, fromExpensive);
                }}
                onDelete={() => {
                    setOnlySale(false);
                    filter(false, onlyNew, fromCheapest, fromExpensive);
                }}
                icon={<AttachMoneyIcon />}
            />
        </div>
    );
};

export default ProductsFilter;
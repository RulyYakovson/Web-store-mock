import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DeleteForever from '@material-ui/icons/DeleteForever';
import {connect} from "react-redux";
import {PRODUCTS_KEY} from "../../utils/constants";
import {fetchProducts} from "../../actions/productsActions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '-5px -5px 5px 5px rgb(158, 158, 158)',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
    },
    inline: {
        display: 'table',
        marginTop: theme.spacing(1)
    },
    deleteIcon: {
        margin: '30px',
        color: 'crimson',
        cursor: "pointer"
    },
    listItemAvatar: {
        marginRight: 15
    },
    avatar: {
        height: 80,
        width: 80
    }
}));

const UserProductsListView = ({products, dispatch}) => {
    const classes = useStyles();
    const [productsMap, setProductsMap] = useState(new Map(JSON.parse(localStorage.getItem(PRODUCTS_KEY))));

    useEffect(() => {
        dispatch(fetchProducts());
        setProductsMap(new Map(JSON.parse(localStorage.getItem(PRODUCTS_KEY))))
    }, []);

    const handleDeleteItem = (id) => {
        const productsMap = new Map(JSON.parse(localStorage.getItem(PRODUCTS_KEY)));
        productsMap.delete(id);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(Array.from(productsMap)));
        setProductsMap(productsMap);
    };

    const productsItems = []
    productsMap.forEach((amount, id) => {
        const product = products && products.find(p => p.id === id);
        productsItems.push(
            <div>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar className={classes.listItemAvatar}>
                        <Avatar
                            className={classes.avatar}
                            alt="Remy Sharp"
                            src={product && product.src ? `data:image/png;base64, ${product.src}` : null}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={product && product.name}
                        secondary={
                            <React.Fragment>
                                {product && product.description}
                                <br/>
                                <div className={classes.inline}>
                                    <Typography
                                        component="p"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        {`Amount: ${amount} units`}
                                    </Typography>
                                    <Typography
                                        component="p"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        {`Total price: ${product && product.price * amount}`}  &#8362;
                                    </Typography>
                                </div>
                            </React.Fragment>
                        }
                    />
                    <DeleteForever
                        className={classes.deleteIcon}
                        onClick={() => handleDeleteItem(product.id)}
                    />
                </ListItem>
                <Divider variant="inset" component="li"/>
            </div>)
    });

    return (
        <List className={classes.root}>
            {productsItems}
        </List>
    );
};

export default connect(store => ({
    products: store.products && store.products.products
}))(UserProductsListView);
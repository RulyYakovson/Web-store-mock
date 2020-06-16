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
import {PRODUCTS_KEY} from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 462,
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
                                    <Typography component="p" variant="body2" color="primary">
                                        {`${amount} units`}
                                    </Typography>
                                    <Typography component="p" variant="body2" color="secondary">
                                        {price}  &#8362;
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
    setTotalPrice(totalPrice);

    return (
        <List className={classes.root}>
            {productsItems}
        </List>
    );
};

export default UserProductsListView;
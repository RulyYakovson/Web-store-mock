import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

const ProductListView = ({product, price, amount, handleDeleteItem}) => {
    const classes = useStyles();

    return (
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
        </div>
    );
};

export default ProductListView;
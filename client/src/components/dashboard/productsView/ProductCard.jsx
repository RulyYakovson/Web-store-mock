import React, {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from "@material-ui/core/TextField";
import {PRODUCTS_KEY} from "../../../utils/constants";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        width: 220,
        height: 344,
        maxHeight: 344,
    },
    media: {
        height: 180,
        maxHeight: 180,
    },
    badge: {
        position: "inherit"
    },
    content: {
        minHeight: 70,
        maxHeight: 70,
    },
    name: {
        minHeight: 30,
        maxHeight: 30,
    },
    amountWrapper: {
        textAlign: 'center',
    },
    amountInput: {
        height: 30
    },
    plusButton: {
        marginLeft: 6,
        color: 'blue'
    },
    minusButton: {
        marginRight: 5,
        color: 'crimson'
    }
});

const StyledBadge = withStyles((theme) => ({
    root :{
      position: "absolute",
    },
    badge: {
        right: -3,
        position: "initial",
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Badge);

const ProductCard = ({product, setProductsNum}) => {
    const classes = useStyles();
    const decideTextFieldWidth = () => amount > 98 ? '60px' : amount > 8 ? '50px' : '40px';

    const [amount, setAmount] = useState(new Map(JSON.parse(localStorage.getItem(PRODUCTS_KEY))).get(product.id) || 0);
    const [textFieldWidth, setTextFieldWidth] = useState(decideTextFieldWidth());

    const updateLocalStorage = (amount) => {
        const productsMap = new Map(JSON.parse(localStorage.getItem(PRODUCTS_KEY)));
        amount > 0 ? productsMap.set(product.id, amount) : productsMap.delete(product.id);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(Array.from(productsMap)));
        setProductsNum(productsMap.size);
    };

    const handleAddProduct = () => {
        const newAmount = amount + 1;
        if (newAmount <= product.amount) {
            setAmount(newAmount);
            setTextFieldWidth(decideTextFieldWidth());
            updateLocalStorage(newAmount);
        }
    };

    const handleRemoveProduct = () => {
        const newAmount = amount - 1;
        (amount > 0) && setAmount(newAmount);
        setTextFieldWidth(decideTextFieldWidth());
        updateLocalStorage(newAmount);
    };

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`data:image/png;base64, ${product.src}`}
                />
                {/*TODO: implement in server flower model (add isNew/isSale fields*/}
                {product.amount === 12 && <StyledBadge badgeContent={'New'} color="primary" />}
                {product.amount === 65 && <StyledBadge badgeContent={'Sale'} color="secondary" />}
                <CardContent>
                    <Typography className={classes.name} gutterBottom variant="h5" component="h2">
                        {product.name}
                    </Typography>
                    <Typography className={classes.content} variant="body2" color="textSecondary" component="p">
                        {product.description}
                    </Typography>
                    <div className={classes.amountWrapper}>
                        <RemoveCircleIcon
                            className={classes.minusButton}
                            onClick={handleRemoveProduct}
                        />
                        <TextField
                            className={classes.amountInput}
                            name="amount"
                            variant="outlined"
                            id="amount"
                            value={amount}
                            InputProps={
                                {style: {height: '25px', width: textFieldWidth}}
                            }
                        />
                        <AddCircleIcon
                            className={classes.plusButton}
                            onClick={handleAddProduct}
                        />
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default ProductCard;
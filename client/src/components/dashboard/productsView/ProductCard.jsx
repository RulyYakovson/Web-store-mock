import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from "@material-ui/core/TextField";

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

const ProductCard = ({product}) => {
    const classes = useStyles();
    const decideTextFieldWidth = () => amount > 98 ? '60px' : amount > 8 ? '50px' : '40px';

    const [amount, setAmount] = useState(0);
    const [textFieldWidth, setTextFieldWidth] = useState(decideTextFieldWidth());


    const handleAddProduct = () => {
        const newAmount = amount + 1;
        setAmount(newAmount);
        setTextFieldWidth(decideTextFieldWidth());
    };

    const handleRemoveProduct = () => {
        const newAmount = amount - 1;
        (amount > 0) && setAmount(newAmount);
        setTextFieldWidth(decideTextFieldWidth());
    };

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`data:image/png;base64, ${product.src}`}
                />
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
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import PaymentIcon from '@material-ui/icons/Payment';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {MANDATORY_TITLE, PAYMENT_METHOD} from "../../utils/constants";
import TextField from "@material-ui/core/TextField";
import {isEmpty} from "lodash";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#3f51b5",
        width: 50,
        height: 50
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
    formControl: {
        width: '100%',
    }
}));

const Payment = ({paymentMethod, setPaymentMethod, creditCardNumber, setCreditCardNumber, creditCardType, setCreditCardType}) => {
    const classes = useStyles();

    const [showCreditNumber, setShowCreditNumber] = useState(paymentMethod === PAYMENT_METHOD.CREDIT);

    const handlePaymentMethodSelect = paymentMethod => {
        setPaymentMethod(paymentMethod);
        setShowCreditNumber(paymentMethod === PAYMENT_METHOD.CREDIT);
    };

    return (
        <Container component="main">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PaymentIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Payment
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="payment-method-select-outlined-label">How would you like to pay
                                    ?</InputLabel>
                                <Select
                                    labelId="select-payment-method-label"
                                    id="payment-method-select"
                                    value={paymentMethod}
                                    onChange={event => handlePaymentMethodSelect(event.target.value)}
                                    label="How would you like to pay ?"
                                >
                                    <MenuItem value={PAYMENT_METHOD.CASH}>{PAYMENT_METHOD.CASH}</MenuItem>
                                    <MenuItem value={PAYMENT_METHOD.CREDIT}>{PAYMENT_METHOD.CREDIT}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField hidden/>
                        </Grid>
                        {showCreditNumber && (
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="payment-method-select-outlined-label">Credit card
                                        type</InputLabel>
                                    <Select
                                        labelId="select-credit-card-type-label"
                                        id="credit-card-type-select"
                                        value={creditCardType}
                                        onChange={event => setCreditCardType(event.target.value)}
                                        label="Credit card type"
                                    >
                                        <MenuItem value={'Visa'}>Visa</MenuItem>
                                        <MenuItem value={'Isracard'}>Isracard</MenuItem>
                                        <MenuItem value={'American express'}>American express</MenuItem>
                                        <MenuItem value={'Power card'}>Power card</MenuItem>
                                        <MenuItem value={'Shomrei shabat'}>Shomrei shabat</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                        {showCreditNumber && (
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="creditCardNumber"
                                    label="Credit card number"
                                    name="creditCardNumber"
                                    value={creditCardNumber}
                                    onChange={event => setCreditCardNumber(event.target.value)}
                                    title={isEmpty(creditCardNumber) && MANDATORY_TITLE}
                                    error={isEmpty(creditCardNumber)}
                                />
                            </Grid>
                        )}
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Payment;
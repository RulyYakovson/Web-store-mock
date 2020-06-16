import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PaymentIcon from '@material-ui/icons/Payment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {isEmpty} from "lodash";
import {connect} from "react-redux";
import {createAccount} from "../../actions/loginActions";

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        minWidth: 120,
        width: '100%',
    },
}));

// TODO: VALIDATION !!!

const Payment = ({dispatch, history}) => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const onFirstNameChange = firstName => {
        // TODO: validate
        // TODO: set error message if needed
        setFirstName(firstName);
    };

    const onLastNameChange = lastName => {
        // TODO: validate
        // TODO: set error message if needed
        setLastName(lastName);
    };

    const onEmailChange = email => {
        // TODO: validate
        // TODO: set error message if needed
        setEmail(email);
    };

    const onPasswordChange = password => {
        // TODO: validate
        // TODO: set error message if needed
        setPassword(password);
    };

    const onConfirmPasswordChange = confirmPassword => {
        // TODO: validate
        // TODO: set error message if needed
        setConfirmPassword(confirmPassword);
    };

    const onPhoneChange = phone => {
        // TODO: validate
        // TODO: set error message if needed
        setPhone(phone);
    };

    const onGenderChange = gender => {
        // TODO: validate
        // TODO: set error message if needed
        setGender(gender);
    };

    const createAccountAction = async event => {
        event.preventDefault();
        const user = {
            firstName, lastName, password, email, gender, phone
        }
        await dispatch(createAccount(user));
        history.push('/home');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PaymentIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Payment
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={event => onFirstNameChange(event.target.value)}
                                error={!isEmpty(errorMessage)} // TODO
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={lastName}
                                onChange={event => onLastNameChange(event.target.value)}
                                error={!isEmpty(errorMessage)} // TODO
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={event => onEmailChange(event.target.value)}
                                error={!isEmpty(errorMessage)} // TODO
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={event => onPasswordChange(event.target.value)}
                                error={!isEmpty(errorMessage)} // TODO
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirm-password"
                                label="Confirm password"
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={event => onConfirmPasswordChange(event.target.value)}
                                error={!isEmpty(errorMessage)} // TODO
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="phone"
                                label="Phone"
                                type="phone"
                                id="phone"
                                autoComplete="phone"
                                value={phone}
                                onChange={event => onPhoneChange(event.target.value)}
                                error={!isEmpty(errorMessage)} // TODO
                            />
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default connect(store => ({}))(Payment);
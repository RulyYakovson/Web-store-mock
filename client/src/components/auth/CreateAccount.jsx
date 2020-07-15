import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../Copyright';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {connect} from "react-redux";
import {isEmpty} from "lodash";
import {MANDATORY_TITLE} from '../../utils/constants';
import {createAccount} from "../../actions/loginActions";
import {isPatternValid, VALIDATOR_TYPES} from "../../utils/validator";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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

const CreateAccount = ({dispatch, history}) => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState(MANDATORY_TITLE);
    const [password, setPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(MANDATORY_TITLE);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(MANDATORY_TITLE);
    const [phone, setPhone] = useState('');
    const [phoneErrorMessage, setPhoneErrorMessage] = useState(MANDATORY_TITLE);
    const [gender, setGender] = useState('None');
    const disabledButton = !!emailErrorMessage || !!passwordErrorMessage || !!confirmPasswordErrorMessage
        || !!phoneErrorMessage || isEmpty(firstName) || isEmpty(lastName)

    const onEmailChange = email => {
        setEmail(email);
        if (isEmpty(email)) {
            setEmailErrorMessage(MANDATORY_TITLE);
        } else if (!isPatternValid(email, VALIDATOR_TYPES.EMAIL)) {
            setEmailErrorMessage(`"${email}" is not a valid email`);
        } else {
            setEmailErrorMessage(null);
        }
    };

    const onPhoneChange = phone => {
        setPhone(phone);
        if (isEmpty(phone)) {
            setPhoneErrorMessage(MANDATORY_TITLE);
        } else if (!isPatternValid(phone, VALIDATOR_TYPES.PHONE)) {
            setPhoneErrorMessage(`"${phone}" is not a valid phone`);
        } else {
            setPhoneErrorMessage(null);
        }
    };

    const onPasswordChange = password => {
        setPassword(password);
        handlePasswordsMatchMessage(password, confirmPassword);
        if (isEmpty(password)) {
            setPasswordErrorMessage(MANDATORY_TITLE);
        } else if (!isPatternValid(password, VALIDATOR_TYPES.PASSWORD)) {
            setPasswordErrorMessage('Password must be between 4 to 8 characters');
        } else {
            setPasswordErrorMessage(null);
        }
    };


    const onConfirmPasswordChange = confirmPassword => {
        debugger
        setConfirmPassword(confirmPassword);
        handlePasswordsMatchMessage(password, confirmPassword);
        if (isEmpty(confirmPassword)) {
            setConfirmPasswordErrorMessage(MANDATORY_TITLE);
        }
    };

    const handlePasswordsMatchMessage = (pass, confirm) => {
        if (isEmpty(pass) || isEmpty(confirm)) {
            setConfirmPasswordErrorMessage(null);
        } else if (pass !== confirm) {
            setConfirmPasswordErrorMessage('Passwords do not match');
        } else {
            setConfirmPasswordErrorMessage(null);
        }
    };

    const createAccountAction = async event => {
        event.preventDefault();
        const user = {firstName, lastName, password, email, gender, phone}
        await dispatch(createAccount(user));
        history.push('/home');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
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
                                onChange={event => setFirstName(event.target.value)}
                                title={isEmpty(firstName) && MANDATORY_TITLE}
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
                                onChange={event => setLastName(event.target.value)}
                                title={isEmpty(lastName) && MANDATORY_TITLE}
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
                                title={emailErrorMessage}
                                error={emailErrorMessage && emailErrorMessage !== MANDATORY_TITLE}
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
                                title={passwordErrorMessage}
                                error={passwordErrorMessage && passwordErrorMessage !== MANDATORY_TITLE}
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
                                title={confirmPasswordErrorMessage}
                                error={confirmPasswordErrorMessage && confirmPasswordErrorMessage !== MANDATORY_TITLE}
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
                                title={phoneErrorMessage}
                                error={phoneErrorMessage && phoneErrorMessage !== MANDATORY_TITLE}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                                <Select
                                    labelId="create-account-gender-label"
                                    id="create-account-gender"
                                    value={gender}
                                    onChange={event => setGender(event.target.value)}
                                    label="Gender"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={createAccountAction}
                        disabled={disabledButton}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
};

export default connect(store => ({}))(CreateAccount);
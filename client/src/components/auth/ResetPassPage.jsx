import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
    Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from '../Copyright';
import {makeStyles} from "@material-ui/core/styles";
import {login} from "../../actions/loginActions";
import {changePass, resetPass} from "../../actions/resetPassAction";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(images/favicon.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        textTransform: "capitalize"
    },
}));

// TODO: VALIDATION !!!

const ResetPassPage = ({dispatch, history}) => {
    const classes = useStyles();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [token, setToken] = useState(null);
    const [afterReset, setAfterReset] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

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

    const onTokenChange = token => {
        // TODO: validate
        // TODO: set error message if needed
        setToken(token);
    };

    const handleResetAction = async event => {
        event.preventDefault();
        afterReset ?
            dispatch(changePass(token, email, password))
            : await dispatch(resetPass(email)) && setAfterReset(true);
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <form className={classes.form}>
                        {!afterReset ? <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={event => onEmailChange(event.target.value)}
                            error={!isEmpty(errorMessage)} // TODO
                        /> : (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="token"
                                        label="Verification token (sent to your email)"
                                        type="text"
                                        id="token"
                                        value={token}
                                        onChange={event => onTokenChange(event.target.value)}
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
                            </Grid>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color={afterReset ? "primary" : "secondary"}
                            className={classes.submit}
                            onClick={handleResetAction}
                        >
                            {afterReset ? 'Change Password' : 'RESET'}
                        </Button>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default connect(store => ({}))(ResetPassPage);
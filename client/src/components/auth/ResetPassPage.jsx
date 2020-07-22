import React, {useState} from 'react';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from '../Copyright';
import {makeStyles} from "@material-ui/core/styles";
import {changePass, resetPass} from "../../actions/resetPassAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import {MANDATORY_TITLE} from "../../utils/constants";
import {onConfirmPasswordChange, onEmailChange, onPasswordChange} from "../../utils/onChangeHandler";

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
        textTransform: "capitalize",
        minHeight: '36px'
    },
    buttonProgress: {
        color: '#3f51b5',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

// TODO: VALIDATION !!!

const ResetPassPage = ({dispatch, history, isLoading}) => {
    const classes = useStyles();

    const [email, setEmail] = useState(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState(MANDATORY_TITLE);
    const [password, setPassword] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
    const [token, setToken] = useState(null);
    const [afterReset, setAfterReset] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    const buttonDisabled = isLoading || (!afterReset && !!emailErrorMessage) || (afterReset && isEmpty(token))

    const onTokenChange = token => {
        // TODO: validate
        // TODO: set error message if needed
        setToken(token);
    };

    const handleResetAction = async event => {
        event.preventDefault();
        afterReset ?
            await dispatch(changePass(token, email, password))
            : await dispatch(resetPass(email)) && setAfterReset(true);

        afterReset && history.push('/home');
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
                            required
                            fullWidth
                            id="email-reset-pass"
                            type="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            value={email}
                            onChange={event => onEmailChange(event.target.value, setEmail, setEmailErrorMessage)}
                            title={emailErrorMessage}
                            error={emailErrorMessage && emailErrorMessage !== MANDATORY_TITLE}
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
                                        title={isEmpty(token) && MANDATORY_TITLE}
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
                                        id="password-reset-pass"
                                        value={password}
                                        title={passwordErrorMessage}
                                        error={passwordErrorMessage && passwordErrorMessage !== MANDATORY_TITLE}
                                        onChange={event =>
                                            onPasswordChange(event.target.value, confirmPassword, setPassword, setPasswordErrorMessage, setConfirmPasswordErrorMessage)
                                        }
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
                                        id="confirm-password-reset-pass"
                                        value={confirmPassword}
                                        onChange={event =>
                                            onConfirmPasswordChange(event.target.value, password, setConfirmPassword, setConfirmPasswordErrorMessage)
                                        }
                                        title={confirmPasswordErrorMessage}
                                        error={confirmPasswordErrorMessage && confirmPasswordErrorMessage !== MANDATORY_TITLE}
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
                            disabled={buttonDisabled}
                        >
                            {!isLoading && (afterReset ? 'Change Password' : 'RESET')}
                            {isLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
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

export default connect(store => ({
    isLoading: store.resetPass.isResetPassLoading,
}))(ResetPassPage);
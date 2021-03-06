import React, {useState} from 'react';
import {get} from 'lodash';
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
import {MANDATORY_TITLE} from '../../utils/constants';
import {makeStyles} from "@material-ui/core/styles";
import {login} from "../../actions/loginActions";
import {onEmailChange} from "../../utils/onChangeHandler";

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
    },
}));

const LoginPage = ({dispatch, history}) => {
    const classes = useStyles();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState(MANDATORY_TITLE);
    const disabledButton = !!emailErrorMessage || isEmpty(password);

    const loginAction = async event => {
        event.preventDefault();
        await dispatch(login(email, password, rememberMe));
        const url = get(history, "location.state.from.pathname",'/home');
        history.push(url);
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
                        Sign in
                    </Typography>
                    <form className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email-login"
                            type="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={event => onEmailChange(event.target.value, setEmail, setEmailErrorMessage)}
                            title={emailErrorMessage}
                            error={emailErrorMessage && emailErrorMessage !== MANDATORY_TITLE}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password-login"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            title={isEmpty(password) && MANDATORY_TITLE}
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" value="remember"/>}
                            checked={rememberMe}
                            onChange={event => setRememberMe(event.target.checked)}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={disabledButton}
                            onClick={loginAction}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/reset-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/create-account" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default connect(store => ({}))(LoginPage);
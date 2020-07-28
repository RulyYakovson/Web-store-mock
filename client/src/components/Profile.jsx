import React, {useState} from 'react';
import {isEmpty} from "lodash";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {updateAccount} from "../actions/loginActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from "react-redux";
import {MANDATORY_TITLE} from "../utils/constants";
import {onEmailChange, onPhoneChange} from "../utils/onChangeHandler";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#3f51b5"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
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
    formControl: {
        minWidth: 120,
        width: '100%',
    },
}));

const Profile = ({dispatch, user, isLoading}) => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState(user && user.firstName);
    const [lastName, setLastName] = useState(user && user.lastName);
    const [email, setEmail] = useState(user && user.username);
    const [emailErrorMessage, setEmailErrorMessage] = useState(null);
    const [phone, setPhone] = useState(user && user.phone);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState(null);
    const [gender, setGender] = useState(user && user.gender);
    const buttonDisabled = user && (firstName === user.firstName && lastName === user.lastName
        && email === user.username && phone === user.phone && gender === user.gender)
        || isLoading || isEmpty(firstName) || isEmpty(lastName) || !!phoneErrorMessage || !!emailErrorMessage;

    const createAccountAction = async event => {
        event.preventDefault();
        const modifiedUser = {firstName, lastName, gender, phone, username: email, id: user.id}
        await dispatch(updateAccount(modifiedUser));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonSharpIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Profile
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
                                id="firstName-profile"
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
                                id="lastName-profile"
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
                                id="email-profile"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={event => onEmailChange(event.target.value, setEmail, setEmailErrorMessage)}
                                title={emailErrorMessage}
                                error={emailErrorMessage && emailErrorMessage !== MANDATORY_TITLE}
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
                                id="phone-profile"
                                autoComplete="phone"
                                value={phone}
                                onChange={event => onPhoneChange(event.target.value, setPhone, setPhoneErrorMessage)}
                                title={phoneErrorMessage}
                                error={phoneErrorMessage && phoneErrorMessage !== MANDATORY_TITLE}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="update-account-select-outlined-label">Gender</InputLabel>
                                <Select
                                    labelId="update-account-gender-label"
                                    id="update-account-gender"
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
                        disabled={buttonDisabled}
                    >
                        {!isLoading && 'Update'}
                        {isLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default connect(store => ({
    isLoading: store.login.isUpdateLoading,
}))(Profile);
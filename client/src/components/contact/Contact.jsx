import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {addContact} from "../../actions/contactMessagesActions";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import './contact.css';

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
    button: {
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
    formControl: {
        minWidth: 120,
        width: '100%',
    },
    textarea: {
        width: '100%',
        padding: '18.5px 14px',
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'inherit',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        fontStretch: 'expanded',
        fontSize: '1rem'
    }
}));

const Contact = ({dispatch, isLoading}) => {
    const classes = useStyles();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const onFullNameChange = fullName => {
        // TODO: validate
        // TODO: set error message if needed
        setFullName(fullName);
    };

    const onEmailChange = email => {
        // TODO: validate
        // TODO: set error message if needed
        setEmail(email);
    };

    const onMessageChange = message => {
        // TODO: validate
        // TODO: set error message if needed
        setMessage(message);
    };

    const sendMessageAction = async event => {
        event.preventDefault();
        const success = await dispatch(addContact(email, fullName, message));
        console.log(success);
        debugger;
        if (success) {
            setMessage('');
            setEmail('');
            setFullName('');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <MailOutlineIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Contact Us
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
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
                                // error={!isEmpty(errorMessage)} // TODO
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                value={fullName}
                                onChange={event => onFullNameChange(event.target.value)}
                                // error={!isEmpty(errorMessage)} // TODO
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextareaAutosize
                                required
                                className={classes.textarea + ' contact-textarea'}
                                aria-label="minimum height"
                                rowsMin={5}
                                maxLength={500}
                                placeholder="Send us your message"
                                value={message}
                                onChange={event => onMessageChange(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        className={classes.button}
                        onClick={sendMessageAction}
                    >
                        {!isLoading && 'Send'}
                        {isLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                    </Button>
                </form>
            </div>
        </Container>
    );
};


export default connect(store => ({
    isLoading: store.messages.isLoading,
}))(Contact);
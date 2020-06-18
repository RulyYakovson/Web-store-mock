import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {green, grey} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles((theme) => ({
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: '28.7%',
        zIndex: 1,
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 462
    },
    finish: {
        backgroundColor: green[500],
        height: 198,
        width: 198,
        top: '10%',
    },
    failed: {
        backgroundColor: red[500],
        height: 198,
        width: 198,
        top: '10%',
    },
    isLoading: {
        backgroundColor: grey[500],
        height: 198,
        width: 198,
        top: '25%'
    },
    icon: {
        fontSize: '5rem'
    },
    span: {
        marginTop: 50,
        color: green[900]
    },
    failedSpan: {
        marginTop: 50,
        color: red[900]
    }
}));

const Finish = ({isLoading, success, failed}) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                {success && <span className={classes.span}>✔&nbsp;Your order has been sent successfully</span>}
                {success &&
                <Fab aria-label="save" className={classes.finish}>
                    <CheckIcon className={classes.icon}/>
                </Fab>}
                {failed && <span className={classes.failedSpan}>&#9785;&nbsp;&nbsp;Error has occurred please try again letter</span>}
                {failed &&
                <Fab aria-label="save" className={classes.failed}>
                    <ErrorOutlineIcon className={classes.icon}/>
                </Fab>}
                {isLoading && <CircularProgress size={208} thickness={1} className={classes.fabProgress}/>}
            </div>
        </Container>
    );
};

export default Finish;
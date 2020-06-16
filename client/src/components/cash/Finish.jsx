import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import CheckIcon from '@material-ui/icons/Check';
import {green, grey} from "@material-ui/core/colors";

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
    }
}));

const Finish = ({isLoading}) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                {!isLoading && <span className={classes.span}>✔ Your order has been sent successfully</span>}
                {!isLoading &&
                <Fab aria-label="save" className={classes.finish}>
                    <CheckIcon className={classes.icon}/>
                </Fab>}
                {isLoading && <CircularProgress size={208} thickness={1} className={classes.fabProgress}/>}
            </div>
        </Container>
    );
};

export default Finish;
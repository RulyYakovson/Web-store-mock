import React from 'react';
import {
    CssBaseline,
    Link,
    Paper,
    Box,
    Grid,
    Typography
} from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import Copyright from '../Copyright';
import {makeStyles} from "@material-ui/core/styles";

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
        margin: theme.spacing(25, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        margin: theme.spacing(1),
        color: 'crimson',
        fontSize: '4rem'
    },
    link: {
        marginTop: theme.spacing(1)
    }
}));

const SessionExpired = () => {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <BlockIcon className={classes.icon}/>
                    <Typography component="h1" variant="h5">
                        Session expired
                    </Typography>
                    <Grid item xs={20} className={classes.link}>
                        <Link href="/login" variant="body2">
                            {"Back to sign in"}
                        </Link>
                    </Grid>
                    <Box mt={10}>
                        <Copyright/>
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
};

export default SessionExpired;
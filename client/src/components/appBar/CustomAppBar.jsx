import React, {useState, forwardRef} from "react";
import clsx from "clsx";
import {NavLink} from 'react-router-dom';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import AppBarMenu from "./AppBarMenu";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import BlockIcon from "@material-ui/icons/Block";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from '@material-ui/core/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    dialogTitle: {
        padding: '16px 40px',
        paddingBottom: '0px',
    },
    dialogIcon: {
        marginTop: theme.spacing(3),
        alignSelf: "center",
        color: 'crimson',
        fontSize: '4rem'
    },
    dialogButton: {
        justifyContent: "center"
    }
}));

const CustomAppBar = ({productsNum, open, setOpen, history, user, dispatch}) => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);

    const ShoppingCartIconProps = productsNum > 0 ?
        {component: NavLink, to: "/cash", title: 'Cash', color: "inherit"}
        : {
            onClick: () => {
                setOpenDialog(true)
            }
        };

    return (
        <div>
            <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}/>
                    <IconButton {...ShoppingCartIconProps}>
                        <Badge badgeContent={productsNum} color="secondary" invisible={productsNum === 0}>
                            <ShoppingCartIcon style={{color: 'white'}}/>
                        </Badge>
                    </IconButton>
                    <AppBarMenu
                        history={history}
                        user={user}
                        dispatch={dispatch}
                    />
                </Toolbar>
            </AppBar>
            <Dialog TransitionComponent={Transition} disableEscapeKeyDown open={openDialog}>
                <BlockIcon className={classes.dialogIcon}/>
                <DialogTitle className={classes.dialogTitle}>
                    <DialogContentText>
                        Please add at least one product to the cart
                    </DialogContentText>
                </DialogTitle>
                <DialogActions className={classes.dialogButton}>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CustomAppBar;
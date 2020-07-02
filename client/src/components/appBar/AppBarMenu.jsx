import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle, ExitToApp} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {logOut} from "../../actions/loginActions";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        textTransform: "capitalize"
    },
    title: {
        flexGrow: 1,
        margin: "auto",
        marginRight: theme.spacing(5),
        fontSize: "initial"
    },
    div: {
       display: "inline-flex"
    },
    iconButton: {
        marginLeft: theme.spacing(2)
    }
}));

const AppBarMenu = ({dispatch, user, history}) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const displayMenu = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        dispatch(logOut(history))
    }

    return (
        <div className={classes.div}>
            <IconButton
                className={classes.iconButton}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event => setAnchorEl(event.currentTarget))}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
            <Typography
                className={classes.title}
                component="h6"
                variant="h6"
                color="inherit"
                noWrap
            >
                {user ? `${user.firstName} ${user.lastName}` : ''}
            </Typography>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={displayMenu}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <Divider/>
                <MenuItem>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<ExitToApp />}
                        onClick={handleLogOut}
                    >
                        Sign Out
                    </Button>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default AppBarMenu
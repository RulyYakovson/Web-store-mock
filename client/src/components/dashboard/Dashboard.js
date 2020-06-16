import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {mainListItems, secondaryListItems} from './listItems';
import Copyright from '../Copyright';
import About from "../about/About";
import Home from "./Home";
import {INNER_COMPONENTS, PRODUCTS_KEY, USER_ROLE} from '../../utils/constants';
import {connect} from "react-redux";
import {refresh} from "../../actions/loginActions";
import UsersTable from "./usersTable/UsersTable";
import CustomAppBar from "./appBar/CustomAppBar";
import ProductsTable from "./usersTable/ProductsTable";
import ProductsCardsView from "./productsView/ProductsCardsView";
import Contact from "../contact/Contact";
import ContactMessagesTable from "./usersTable/ContactMessagesTable";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    menuButton: {
        marginRight: 36,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const Dashboard = ({history, user, dispatch}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [productsNum, setProductsNum] = useState(new Map(JSON.parse(localStorage.getItem(PRODUCTS_KEY))).size);
    const [displayComponent, setDisplayComponent] =
        useState(user && user.role === USER_ROLE.CUSTOMER ? INNER_COMPONENTS.ABOUT : INNER_COMPONENTS.HOME)

    useEffect(() => {
        dispatch(refresh());
    }, []);

    const getDisplayComponent = () => {
        switch (displayComponent) {
            case INNER_COMPONENTS.HOME:
                return <Home/>;
            case INNER_COMPONENTS.ABOUT:
                return <About/>;
            case INNER_COMPONENTS.EMPLOYEES_TABLE:
                return <UsersTable employeesType/>;
                case INNER_COMPONENTS.USERS_TABLE:
                return <UsersTable/>;
            case INNER_COMPONENTS.PRODUCTS_TABLE:
                return <ProductsTable/>;
            case INNER_COMPONENTS.PRODUCTS_VIEW:
                return <ProductsCardsView setProductsNum={setProductsNum}/>;
            case INNER_COMPONENTS.CONTACT_US:
                return <Contact/>
            case INNER_COMPONENTS.CONTACT_MESSAGES:
                return <ContactMessagesTable/>;
            default:
                return <About/>;
        };
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <CustomAppBar
                productsNum={productsNum}
                open={open}
                setOpen={setOpen}
                history={history}
                user={user}
                dispatch={dispatch}
            />
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => setOpen(false)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{mainListItems(setDisplayComponent)}</List>
                <Divider/>
                {user && user.role === USER_ROLE.ADMIN && (
                    <List>{secondaryListItems(setDisplayComponent)}</List>
                )}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    {getDisplayComponent()}
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>
    );
};

export default connect(store => ({
    user: store.login.user,
}))(Dashboard);

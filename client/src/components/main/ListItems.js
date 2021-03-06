import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import EmployeeIcon from '@material-ui/icons/PeopleOutlineOutlined';
import ForumIcon from '@material-ui/icons/Forum';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import StorageIcon from '@material-ui/icons/Storage';
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import HistoryIcon from '@material-ui/icons/History';
import {INNER_COMPONENTS} from "../../utils/constants";

export const mainListItems = (setDisplayComponent) => (
    <div>
        <ListItem button onClick={() => setDisplayComponent(INNER_COMPONENTS.ABOUT)}>
            <ListItemIcon>
                <InfoIcon/>
            </ListItemIcon>
            <ListItemText primary="About"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(INNER_COMPONENTS.CONTACT_US)}>
            <ListItemIcon>
                <ContactMailIcon/>
            </ListItemIcon>
            <ListItemText primary="Contact us"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(INNER_COMPONENTS.PRODUCTS_VIEW)}>
            <ListItemIcon>
                <LocalGroceryStoreIcon/>
            </ListItemIcon>
            <ListItemText primary="Store"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(INNER_COMPONENTS.CHAT)}>
            <ListItemIcon>
                <ForumIcon/>
            </ListItemIcon>
            <ListItemText primary="Chat"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(INNER_COMPONENTS.USER_HISTORY)}>
            <ListItemIcon>
                <HistoryIcon/>
            </ListItemIcon>
            <ListItemText primary="Recent orders"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(INNER_COMPONENTS.PROFILE)}>
            <ListItemIcon>
                <PersonSharpIcon/>
            </ListItemIcon>
            <ListItemText primary="Profile"/>
        </ListItem>
    </div>
);

export const secondaryListItems = (setDisplayComponent) => (
    <div>
        <ListSubheader inset>Management</ListSubheader>
        <ListItem button onClick={() => setDisplayComponent(INNER_COMPONENTS.HOME)}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(INNER_COMPONENTS.USERS_TABLE)}>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Customers"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(INNER_COMPONENTS.EMPLOYEES_TABLE)}>
            <ListItemIcon>
                <EmployeeIcon/>
            </ListItemIcon>
            <ListItemText primary="Employees"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(INNER_COMPONENTS.CONTACT_MESSAGES)}>
            <ListItemIcon>
                <ContactMailIcon/>
            </ListItemIcon>
            <ListItemText primary="Messages"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(INNER_COMPONENTS.PRODUCTS_TABLE)}>
            <ListItemIcon>
                <StorageIcon/>
            </ListItemIcon>
            <ListItemText primary="Products"/>
        </ListItem>
    </div>
);

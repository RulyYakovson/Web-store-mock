import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import EmployeeIcon from '@material-ui/icons/PeopleOutlineOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StorageIcon from '@material-ui/icons/Storage';
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import {innerComponents} from "../../utils/constants";

export const mainListItems = (setDisplayComponent) => (
    <div>
        <ListItem button onClick={() => setDisplayComponent(innerComponents.ABOUT)}>
            <ListItemIcon>
                <InfoIcon/>
            </ListItemIcon>
            <ListItemText primary="About"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(innerComponents.CONTACT_US)}>
            <ListItemIcon>
                <ContactMailIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(innerComponents.PRODUCTS_VIEW)}>
            <ListItemIcon>
                <LocalGroceryStoreIcon/>
            </ListItemIcon>
            <ListItemText primary="Store"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="Integrations"/>
        </ListItem>
    </div>
);

export const secondaryListItems = (setDisplayComponent) => (
    <div>
        <ListSubheader inset>Management</ListSubheader>
        <ListItem button onClick={() => setDisplayComponent(innerComponents.HOME)}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(innerComponents.USERS_TABLE)}>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Customers"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(innerComponents.EMPLOYEES_TABLE)}>
            <ListItemIcon>
                <EmployeeIcon/>
            </ListItemIcon>
            <ListItemText primary="Employees"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(innerComponents.PRODUCTS_TABLE)}>
            <ListItemIcon>
                <StorageIcon/>
            </ListItemIcon>
            <ListItemText primary="Products"/>
        </ListItem>
    </div>
);

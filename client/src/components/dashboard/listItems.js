import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import EmployeeIcon from '@material-ui/icons/PeopleOutlineOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {innerComponents} from "../../utils/constants";

export const mainListItems = (setDisplayComponent) => (
    <div>
        <ListItem button onClick={() => setDisplayComponent(innerComponents.HOME)}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(innerComponents.PRODUCTS_VIEW)}>
            <ListItemIcon>
                <LocalGroceryStoreIcon/>
            </ListItemIcon>
            <ListItemText primary="Reports"/>
        </ListItem>
        <ListItem button onClick={() => setDisplayComponent(innerComponents.MOCK_HOME)}>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="Orders"/>
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
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="Products"/>
        </ListItem>
    </div>
);

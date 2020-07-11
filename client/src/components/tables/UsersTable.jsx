import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import MaterialTable from 'material-table';
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import {DeleteForever, Edit} from '@material-ui/icons';
import {addUser, deleteUser, fetchUsers, updateUser} from "../../actions/usersActions";
import {addEmployee, deleteEmployee, fetchEmployees, updateEmployee} from "../../actions/employeesActions";
import Title from "../Title";

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: 'auto',
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
}));

const UsersTable = ({employeesType, users, employees, dispatch, isLoading}) => {
    const classes = useStyles();

    const [selectedRow, setSelectedRow] = useState(null);

    const avatarCellView = rowData => {
        const isAdmin = employeesType && rowData.role === 'Admin';
        let imageName = null;
        switch (rowData.gender) {
            case 'Male': {
                imageName = isAdmin ? 'admin_male' : 'user_male';
                break;
            }
            case 'Female': {
                imageName = isAdmin ? 'admin_female' : 'user_female';
                break;
            }
            default: break;
        };

        return (
            <Avatar
                variant="circle"
                className={classes.avatar}
                src={`images/${imageName}.png`}
            />
        );
    };

    const columns = [
        {editable: 'never', render: avatarCellView},
        {title: 'First name', field: 'firstName'},
        {title: 'Last name', field: 'lastName'},
        {title: 'Email', field: 'email', editable: 'onAdd'},
        {title: 'Phone', field: 'phone'},
        {title: 'Gender', field: 'gender', lookup: {Male: 'Male', Female: 'Female', None: 'None'}},
    ];

    const employeesColumns = [
        ...columns,
        {
            title: 'Role',
            field: 'role',
            lookup: {Admin: 'Admin', Employee: 'Employee'},
        },
    ];

    useEffect(() => {
        employeesType ?
            dispatch(fetchEmployees())
            : dispatch(fetchUsers())
    }, []);

    useEffect(() => {
        employeesType ?
            dispatch(fetchEmployees())
            : dispatch(fetchUsers())
    }, [employeesType]);

    return (
        <div>
            <MaterialTable
                isLoading={isLoading}
                title={<Title>{`${employeesType ? 'Employees' : 'Customers'} details`}</Title>}
                columns={employeesType ? employeesColumns : columns}
                data={employeesType ? employees : users}
                localization={{header: {actions: ''}}}
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.id))}
                icons={{
                    Delete: () => <DeleteForever style={{color: "crimson"}}/>,
                    Edit: () => <Edit style={{color: "darkslateblue"}}/>
                }}
                options={{
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.id) ? '#EEE' : '#FFF'
                    }),
                    headerStyle: {
                        backgroundColor: '#3f51b5',
                        color: '#FFF'
                    },
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                }}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            employeesType ?
                                dispatch(addEmployee(newData))
                                : dispatch(addUser(newData));
                            resolve();
                        }),
                    onRowUpdate: (newData) =>
                        new Promise((resolve) => {
                            employeesType ?
                                dispatch(updateEmployee(newData))
                                : dispatch(updateUser(newData));
                            resolve();
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            employeesType ?
                                dispatch(deleteEmployee(oldData.id))
                                : dispatch(deleteUser(oldData.id));
                            resolve();
                        }),
                }}
            />
        </div>
    );
};

export default connect(store => ({
    users: store.users && store.users.users,
    employees: store.employees && store.employees.employees,
    isLoading: store.users.isLoading || store.employees.isLoading
}))(UsersTable);
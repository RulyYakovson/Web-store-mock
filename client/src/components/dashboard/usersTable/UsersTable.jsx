import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import {addUser, deleteUser, fetchUsers, updateUser} from "../../../actions/usersActions";
import {addEmployee, deleteEmployee, fetchEmployees, updateEmployee} from "../../../actions/employeesActions";

const UsersTable = ({employeesType, users, employees, dispatch}) => {

    const columns = [
        {title: 'First name', field: 'firstName'},
        {title: 'Last name', field: 'lastName'},
        {title: 'Email', field: 'email'/*, editable: false*/}, // TODO: find a way to add but not update
        {title: 'Phone', field: 'phone'},
        // {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
        {
            title: 'Gender',
            field: 'gender',
            lookup: {Male: 'Male', Female: 'Female', None: 'None'},
        },
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
                title={`${employeesType ? 'Employees' : 'Customers'} details`}
                columns={employeesType ? employeesColumns : columns}
                data={employeesType ? employees : users}
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
    employees: store.employees && store.employees.employees
}))(UsersTable);
import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import {addUser, deleteUser, fetchUsers, updateUser} from "../../../../actions/usersAction";
import AddUserModal from "./AddUserModal";

const UsersTable = ({users, isLoading, dispatch}) => {

    const columns = [
        {title: 'First name', field: 'firstName'},
        {title: 'Last name', field: 'lastName'},
        {title: 'Email', field: 'email'/*, editable: false*/},
        {title: 'Phone', field: 'phone'},
        // {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
        {
            title: 'Gender',
            field: 'gender',
            lookup: {Male: 'Male', Female: 'Female', none: 'None'},
        },
    ];

    useEffect(() => {
        dispatch(fetchUsers())
    }, []);

    const [openModal, setOpenModal] = useState(false);

    return (
        <div>
            <MaterialTable
                title="Customers details"
                columns={columns}
                data={users}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                           dispatch(addUser(newData));
                           resolve();
                        }),
                    onRowUpdate: (newData) =>
                        new Promise((resolve) => {
                            dispatch(updateUser(newData));
                            resolve();
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            dispatch(deleteUser(oldData.id));
                            resolve();
                        }),
                }}
            />
            {/*<AddUserModal*/}
            {/*    open={openModal}*/}
            {/*    closeModal={() => setOpenModal(false)}*/}
            {/*    dispatch*/}
            {/*/>*/}
        </div>
    );
};

export default connect(store => ({
    users: store.users.users,
    isLoading: store.users.isLoading,
}))(UsersTable);
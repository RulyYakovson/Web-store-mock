import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import {fetchUsers} from "../../actions/usersAction";

const UsersTable = ({users, isLoading, dispatch}) => {

    useEffect(() => {
        dispatch(fetchUsers())
    }, []);

    const [state, setState] = useState({
        columns: [
            {title: 'First name', field: 'firstName'},
            {title: 'Last name', field: 'lastName'},
            {title: 'Role', field: 'role'},
            {title: 'Gender', field: 'gender'},
            {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
            {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: {34: 'İstanbul', 63: 'Şanlıurfa'},
            },
        ],
        data: [
            {name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63},
            {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017,
                birthCity: 34,
            },
        ],
    });

    return (
        <MaterialTable
            title="Users details"
            columns={state.columns}
            data={users}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return {...prevState, data};
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return {...prevState, data};
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return {...prevState, data};
                            });
                        }, 600);
                    }),
            }}
        />
    );
};

export default connect(store => ({
    users: store.users.users,
    isLoading: store.users.isLoading,
}))(UsersTable);
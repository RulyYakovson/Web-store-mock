import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import {green, red, orange} from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import PanToolIcon from '@material-ui/icons/PanTool';
import {fetchContactMessages, updateContactMessageStatus} from "../../actions/contactMessagesActions";
import {MESSAGE_STATUS} from "../../utils/constants";
import Title from "../Title";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    pendingButton: {
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    inProgressButton: {
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[700],
        },
    },
    finishButton: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: "primary",
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
}));

const ContactMessagesTable = ({messages, dispatch, isLoading, isRowLoading}) => {
    const classes = useStyles();

    const [selectedRow, setSelectedRow] = useState(null);

    const updateMessageAction = (rowData) => {
        const {id} = rowData;
        setSelectedRow(id);
        switch (rowData.status) {
            case MESSAGE_STATUS.PENDING: {
                dispatch(updateContactMessageStatus(id, MESSAGE_STATUS.IN_PROGRESS));
                break;
            }
            case MESSAGE_STATUS.IN_PROGRESS: {
                dispatch(updateContactMessageStatus(id, MESSAGE_STATUS.FINISH));
                break;
            }
            case MESSAGE_STATUS.FINISH: {
                dispatch(updateContactMessageStatus(id, MESSAGE_STATUS.PENDING));
                break;
            }
            default:
                return;
        }
    };

    const nameColumnStyle = {paddingLeft: '40px'};

    const columns = [
        {title: 'Name', field: 'name', cellStyle: nameColumnStyle, headerStyle: nameColumnStyle},
        {title: 'Email', field: 'email'},
        {title: 'Message', field: 'message'},
    ];

    useEffect(() => {
        dispatch(fetchContactMessages());
    }, []);

    return (
        <div>
            <MaterialTable
                title={<Title>Contact Messages</Title>}
                isLoading={isLoading}
                columns={columns}
                data={messages}
                localization={{header: {actions: ''}}}
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.id))}
                options={{
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.id) ? '#EEE' : '#FFF'
                    }),
                    headerStyle: {
                        backgroundColor: '#3f51b5',
                        color: '#FFF'
                    },
                    actionsColumnIndex: -1,
                }}
                actions={[
                    rowData => ({
                        icon: () => <div className={classes.wrapper}>
                            <Fab
                                aria-label="save"
                                color="primary"
                                className={
                                    rowData.status === MESSAGE_STATUS.PENDING ? classes.pendingButton
                                        : rowData.status === MESSAGE_STATUS.IN_PROGRESS ? classes.inProgressButton
                                        : classes.finishButton
                                }
                            >
                                {
                                    rowData.status === MESSAGE_STATUS.PENDING ?
                                        <PanToolIcon style={{marginRight: '3px'}}/>
                                        : rowData.status === MESSAGE_STATUS.IN_PROGRESS ? <DonutLargeIcon/>
                                        : <CheckIcon/>
                                }
                            </Fab>
                            {selectedRow === rowData.id && isRowLoading &&
                            <CircularProgress size={68} thickness={2} className={classes.fabProgress}/>
                            }
                        </div>,
                        tooltip: `Click to move to "${rowData.status === MESSAGE_STATUS.PENDING ? 'in progress'
                            : rowData.status === MESSAGE_STATUS.IN_PROGRESS ? 'finish'
                                : 'open'}"`,
                        onClick: () => updateMessageAction(rowData)
                    })
                ]}
            />
        </div>
    );
};

export default connect(store => ({
    messages: store.messages.messages,
    isLoading: store.messages.isLoading,
    isRowLoading: store.messages.isRowLoading
}))(ContactMessagesTable);
import React, {useEffect, useState} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Backdrop, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Chatroom from "../../../chat/Chatroom";
import ChatRoomPreview from "./ChatRoomPreview";
import socket from './socket';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const ChatRoomSelection = ({user, history}) => {
    const classes = useStyles();

    const getChatrooms = () => {
        setIsLoading(true);
        client.getChatrooms((err, chatrooms) => {
            if (err) {
                setErrorMessage('Error while trying to fetch chatrooms');
                return;
            }
            setChatrooms(chatrooms);
            setIsLoading(false);
        });
    };

    const [client, setClient] = useState(socket());
    const [chatrooms, setChatrooms] = useState(null);
    const [chatHistory, setChatHistory] = useState(null);
    const [currentChatroom, setCurrentChatroom] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        debugger;
        if (!client || client.socket.disconnected) {
            setClient(socket());
        }
        getChatrooms();
    }, []);

    const onEnterChatroom = (chatroom) => {
        !!currentChatroom && onLeaveChatroom(currentChatroom.name);

        return client.join(chatroom.name, (err, chatHistory) => {
            if (err) {
                console.error(err);
                // setErrorMessage(err.message);
                return;
            }
            debugger
            setChatHistory(chatHistory);
            setCurrentChatroom(chatroom);
        });
    };

    const onLeaveChatroom = (chatroomName) => {
        client.leave(chatroomName, (err) => {
            if (err) {
                return console.error(err)
            }
            setCurrentChatroom(null);
        })
    };

    return (
        <MuiThemeProvider>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Backdrop className={classes.backdrop} open={isLoading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>

                <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                    {
                        chatrooms && chatrooms.map(chatroom =>
                            <ChatRoomPreview
                                key={chatroom.name}
                                chatroom={chatroom}
                                onEnter={() => onEnterChatroom(chatroom)}
                            />)
                    }
                </div>
                <div style={{flex: 3, paddingLeft: '30%', paddingTop: '20px'}}>
                    {!!currentChatroom && (
                        <Chatroom
                            chatroom={currentChatroom}
                            chatHistory={chatHistory}
                            user={user}
                            onLeave={() => onLeaveChatroom(currentChatroom.name)}
                            onSendMessage={(message, cb) => client.message(currentChatroom.name, message, cb)}
                            registerHandler={client.registerHandler}
                            unregisterHandler={client.unregisterHandler}
                        />)}
                </div>
            </div>
        </MuiThemeProvider>
    );
};

export default ChatRoomSelection;

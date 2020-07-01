import React, {useEffect, useState} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Backdrop, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Chatroom from "../../../chat/Chatroom";
import ChatRoomPreview from "./ChatRoomPreview";
import client from '../../../utils/socketClient';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const ChatRoomSelection = ({user}) => {
    const classes = useStyles();

    const [chatrooms, setChatrooms] = useState(null);
    const [chatHistory, setChatHistory] = useState(null);
    const [currentChatroom, setCurrentChatroom] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        getChatrooms();
    }, []);

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

    const onEnterChatroom = (chatroom) => {
        !!currentChatroom && onLeaveChatroom(currentChatroom.name);

        return client.join(chatroom.name, user.id, (err, chatHistory) => {
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
        client.leave(chatroomName, user.id, (err) => {
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
                            onLeave={() => onLeaveChatroom(currentChatroom.name)}
                            onSendMessage={(message, cb) => client.message(currentChatroom.name, message, user.id, cb)}
                            registerHandler={client.registerHandler}
                            unregisterHandler={client.unregisterHandler}
                        />)}
                </div>
            </div>
        </MuiThemeProvider>
    );
};

export default ChatRoomSelection;

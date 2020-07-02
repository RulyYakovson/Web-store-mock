import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
    root: {
        width: 250,
        marginBottom: '15px'
    },
    media: {
        height: 110
    },
    name: {
        height: 20
    },
    content: {
        padding: '7px 16px'
    }
});

const ChatRoomPreview = ({chatroom, onEnter}) => {
    const classes = useStyles();

    return (
        <div onClick={onEnter}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={chatroom.image}
                        //image={`data:image/png;base64, ${chatroom.src}`}
                    />
                    <CardContent className={classes.content}>
                        <Typography className={classes.name} gutterBottom variant="h5" component="h2">
                            {chatroom.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default ChatRoomPreview;
import React, {useState} from "react";
import {DropzoneDialog} from 'material-ui-dropzone';
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {updateImage} from "../actions/productsActions";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'inline-block',

    },
    avatar: {
        margin: 'auto',
        marginLeft: theme.spacing(4),
        width: theme.spacing(9),
        height: theme.spacing(9),
        cursor: "pointer",
    },
}));

const ImageDialog = ({src, rowData, dispatch}) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async (files) => {
        handleClose();
        dispatch(updateImage(files[0], rowData.id));
    };

    return (
            <React.Fragment>
                <DropzoneDialog
                    filesLimit={1}
                    open={open}
                    onSave={handleSave}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp', 'image/jpg']}
                    showPreviewsInDropzone={true}
                    showPreviews={false}
                    maxFileSize={5000000}
                    onClose={handleClose}
                    showAlerts={false}
                />
                <div className={classes.root}>
                    <Avatar
                        onClick={handleOpen}
                        variant="circle"
                        className={classes.avatar}
                        src={src ? `data:image/png;base64, ${src}` : null}
                    />
                </div>
            </React.Fragment>
    );
};

export default ImageDialog;

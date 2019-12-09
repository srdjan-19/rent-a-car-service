import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function SuccessInformation({
    title,
    content = "",
    isVisible,
    handleClose = () => { }
}) {
    const classes = useStyles();

    return (
        <Dialog
            open={isVisible}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            {content && (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={handleClose} className={classes.btnOk}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        textAlign: "center",
        marginTop: theme.spacing(4),
        backgroundColor: "#fafafa",
        border: "2px solid #1b5e20",
        boxShadow: theme.shadows[7],
        alignItems: "center "
    },
    btnOk: {
        color: "#1b5e20"
    }
}));

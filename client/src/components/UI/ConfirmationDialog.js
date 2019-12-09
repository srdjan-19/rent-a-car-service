import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DoneSharpIcon from '@material-ui/icons/DoneSharp';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';

export default function ConfirmatonDialog({
  title,
  content = "",
  isVisible,
  callYesAction = () => { },
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
        <Button
          autoFocus
          onClick={callYesAction}
          className={classes.btnYes}
          variant="contained"
        >
          <DoneSharpIcon></DoneSharpIcon>
        </Button>
        <Button
          onClick={handleClose}
          className={classes.btnNo}
          variant="contained"
        >
          <ClearSharpIcon></ClearSharpIcon>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles(theme => ({
  btnYes: {
    color: "#CEA027",
    '&:hover': {
      background: "transparent",
      color: "red",
    },
  },
  btnNo: {
    color: "#CEA027",
    '&:hover': {
      background: "transparent",
      color: "green",
    },
  }
}));
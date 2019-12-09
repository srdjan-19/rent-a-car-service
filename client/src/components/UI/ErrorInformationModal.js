import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { selectError } from "./../../store/common/selectors";
import { putError } from "../../store/common/actions";


export default function ErrorInformationModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const [hovered, setHovered] = useState(false);

  function handleHover() {
    if (hovered === false)
      setHovered(true)
    else
      setHovered(false)
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    dispatch(putError(null));
    setOpen(false);
  }

  useEffect(() => {
    handleOpen();

    // setTimeout(() => {
    //   handleClose();
    // }, 4000);
  }, [error]);

  return (
    <Dialog
      open={!!error}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>Error</DialogTitle>
      <DialogContent  >
        <DialogContentText id="alert-dialog-description" className={classes.content}>
          {error}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" className={hovered ===
          true ? classes.btnOkHovered : classes.btnOk}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog >
  );
}

const useStyles = makeStyles(theme => ({

  title: {
    color: "#b71c1c",
    marginTop: 25,
    textAlign: "center"
  },
  content: {
    color: "#b71c1c",
    marginBottom: 25,
    textAlign: "center"
  },
  btnOk: {
    color: "#b71c1c",
    border: "1px solid #b71c1c",
    marginRight: "auto",
    marginLeft: "auto"
  },
  btnOkHovered: {
    color: "#CEA33F",
    border: "1px solid #CEA33F",
    marginRight: "auto",
    marginLeft: "auto"
  }
}));

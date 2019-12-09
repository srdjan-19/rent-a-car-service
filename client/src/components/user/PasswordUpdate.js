import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SuccessInformation from "../UI/SuccessInformationModal";
import { useDispatch } from "react-redux";
import { changeUserPassword } from "../../store/user/actions";

export default function PasswordUpdate({ isVisible, handleClose = () => { } }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [succcessModalVisibility, setSuccessModalVisibility] = useState(false);
  const [succcessModalContent, setSuccessModalContent] = useState("");

  const handleConfirm = () => {
    dispatch(
      changeUserPassword({
        oldPassword,
        newPassword,
        callback: (data) => {
          setSuccessModalContent(data);
          setSuccessModalVisibility(true);
          setTimeout(() => {
            handleClose();
            setSuccessModalVisibility(false);
          }, 1000)
        }
      })
    );
  };

  return (
    <Container maxWidth="xs" className={classes.vertical}>
      <SuccessInformation
        title={`Success`}
        content={`${succcessModalContent}`}
        isVisible={succcessModalVisibility}
        handleClose={() => {
          setSuccessModalVisibility(false);
        }} />
      <TextFieldStyled
        margin="normal"
        required
        fullWidth
        type="password"
        id="old-password"
        label="Old password"
        name="old-password"
        autoComplete="old-password"
        autoFocus
        onChange={({ currentTarget }) => {
          setOldPassword(currentTarget.value);
        }}
      />
      <TextFieldStyled
        margin="normal"
        required
        fullWidth
        name="new-password"
        label="New password"
        type="password"
        id="new-password"
        autoComplete="new-password"
        onChange={({ currentTarget }) => {
          setNewPassword(currentTarget.value);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.confirm}
        onClick={handleConfirm}
      >
        Confirm
          </Button>
    </Container>
  );
};


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  vertical: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#fafafa",
    border: "2px solid #CEA33F",
    boxShadow: theme.shadows[7],
    padding: theme.spacing(2, 4, 3)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#37474f"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  confirm: {
    background: "#1A1B1C",
    color: "#CEA027",
    '&:hover': {
      background: "#CEA027",
      color: "#1A1B1C",
    },
    marginTop: 25
  }
}));

const TextFieldStyled = withStyles({
  root: {
    '& label': {
      color: '#1A1B1C',
    },
    '& label.Mui-focused': {
      color: '#CEA027',
    },
    '& .MuiInputBase-input': {
      color: '#1A1B1C',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#1A1B1C',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#CEA027',
    }
  },
})(TextField);

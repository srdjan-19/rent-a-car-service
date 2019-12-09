import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import SuccessInformation from "../UI/SuccessInformationModal";
import { userDataSelector } from "../../store/user/selectors";
import { selectAddresses } from "../../store/common/selectors";
import { saveUserData, putUserData } from "../../store/user/actions";
import { fetchAddresses } from "../../store/common/actions";

export default function ProfileUpdate({ userId, isVisible, handleClose = () => { } }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userDetails = useSelector(userDataSelector);
  const addresses = useSelector(selectAddresses)
  const [succcessModalVisibility, setSuccessModalVisibility] = useState(false);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, []);

  //validation
  function handleSave() {
    dispatch(saveUserData({
      userDetails,
      callback: () => {
        setSuccessModalVisibility(true);
        setTimeout(() => {
          handleClose();
          setSuccessModalVisibility(false);
        }, 1000)
      }
    }));
  }

  return (
    <Container className={classes.vertical} maxWidth="xs">
      <SuccessInformation
        title={`Success`}
        content={`You have been successfully updated your profile!`}
        isVisible={succcessModalVisibility}
        handleClose={() => {
          setSuccessModalVisibility(false);
        }} />
      <TextFieldStyled
        label="Firstname"
        autoFocus
        fullWidth
        className={classes.textFiled}
        margin="normal"
        value={userDetails.firstName}
        onChange={({ currentTarget }) => {
          dispatch(
            putUserData({
              ...userDetails,
              firstName: currentTarget.value
            })
          );
        }}
      />
      <TextFieldStyled
        fullWidth
        label="Lastname"
        className={classes.textField}
        margin="normal"
        value={userDetails.lastName}
        onChange={({ currentTarget }) => {
          dispatch(
            putUserData({ ...userDetails, lastName: currentTarget.value })
          );
        }}
      />
      <TextFieldStyled
        fullWidth
        label="Email"
        className={classes.textField}
        margin="normal"
        value={userDetails.email}
        onChange={({ currentTarget }) => {
          dispatch(putUserData({ ...userDetails, email: currentTarget.value }));
        }}
      />
      <TextFieldStyled
        fullWidth
        label="Phone number"
        className={classes.textField}
        margin="normal"
        value={userDetails.phoneNumber}
        onChange={({ currentTarget }) => {
          dispatch(
            putUserData({
              ...userDetails,
              phoneNumber: currentTarget.value
            })
          );
        }}
      />
      <TextFieldStyled
        id="select-address"
        required
        fullWidth
        label="Addresses"
        select
        value={userDetails.addressId}
        onChange={({ target }) => {
          dispatch(
            putUserData({
              ...userDetails,
              addressId: target.value
            })
          );
        }}
        helperText="Please select your address"
        margin="normal"
      >
        {addresses.map(address => (
          <MenuItem key={address.id} value={address.id} maxHeight={25}>
            {address.street} {", "}{address.city} {", "}  {address.state}
          </MenuItem>
        ))}
      </TextFieldStyled>
      <Button
        variant="contained"
        color="primary"
        className={classes.btnSave}
        onClick={handleSave}
      >
        Save
      </Button>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  vertical: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#fafafa",
    border: "2px solid #CEA33F",
    boxShadow: theme.shadows[7],
    padding: theme.spacing(2, 4, 3)
  },
  btnSave: {
    margin: theme.spacing(1),
    width: "25%",
    marginLeft: "auto",
    marginBottom: 25,
    background: "#1A1B1C",
    color: "#CEA027",
    '&:hover': {
      background: "#CEA027",
      color: "#1A1B1C",
    }
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

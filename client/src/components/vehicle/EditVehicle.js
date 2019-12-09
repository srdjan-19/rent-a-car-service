import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SuccessInformation from "../UI/SuccessInformationModal";
import { updateVehicleDetails } from "../../store/vehicle/actions";

export default function EditVehicle({ vehicle, closeModal = () => { } }) {
  const role = window.localStorage.getItem("role");
  const classes = useStyles();
  const dispatch = useDispatch();

  const [brand, setBrand] = useState(vehicle.brand);
  const [model, setModel] = useState(vehicle.model);
  const [yearOfProduction, setYearOfProduction] = useState(vehicle.yearOfProduction);
  const [type, setType] = useState(vehicle.type);
  const [numberOfSeats, setNumberOfSeats] = useState(vehicle.numberOfSeats);

  const [successModalVisibility, setSuccessModalVisibility] = useState(false);

  function handleSave() {
    dispatch(
      updateVehicleDetails({
        id: vehicle.id,
        brand,
        model,
        yearOfProduction,
        type,
        numberOfSeats,
        callback: () => {
          setSuccessModalVisibility(true);
          setTimeout(() => {
            closeModal();
          }, 2000)
        }
      })
    );
  }

  function handleClose() {
    setSuccessModalVisibility(false);
  }

  return (
    <Container className={classes.vertical} maxWidth="xs">
      <SuccessInformation
        title={`Success`}
        content={`You have been successfully update an vehicle!`}
        handleClose={handleClose}
        isVisible={successModalVisibility}
      ></SuccessInformation>
      <TextFieldStyled
        label="Brand"
        defaultValue={vehicle.brand}
        className={classes.textField}
        margin="normal"
        onChange={({ currentTarget }) => {
          setBrand(currentTarget.value);
        }}
      />
      <TextFieldStyled
        label="Model"
        defaultValue={vehicle.model}
        className={classes.textField}
        margin="normal"
        onChange={({ currentTarget }) => {
          setModel(currentTarget.value);
        }}
      />
      <TextFieldStyled
        label="Year of production"
        defaultValue={vehicle.yearOfProduction}
        className={classes.textField}
        margin="normal"
        onChange={({ currentTarget }) => {
          setYearOfProduction(currentTarget.value);
        }}
      />
      <TextFieldStyled
        label="Type"
        defaultValue={vehicle.type}
        className={classes.textField}
        margin="normal"
        onChange={({ currentTarget }) => {
          setType(currentTarget.value);
        }}
      />
      <TextFieldStyled
        label="Number of seats"
        defaultValue={vehicle.numberOfSeats}
        className={classes.textField}
        margin="normal"
        onChange={({ currentTarget }) => {
          setNumberOfSeats(currentTarget.value);
        }}
      />
      {role === "RENT_A_CAR_ADMIN" ? (
        <Button
          variant="contained"
          color="primary"
          className={classes.btnSave}
          onClick={handleSave}
        >
          Save
        </Button>
      ) : null}
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  vertical: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    border: "2px solid #CEA33F",
    boxShadow: theme.shadows[7],
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flex: 1
  },
  btnSave: {
    margin: theme.spacing(1),
    height: "40%",
    marginTop: 25,
    marginBottom: 25,
    marginLeft: "auto",
    marginRight: "auto",
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

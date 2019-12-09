import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import SuccessInformation from "../UI/SuccessInformationModal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { createRentACarVehicle } from "../../store/vehicle/actions";

export default function CreateVehicle({ rentACarId, closeModal = () => { } }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [type, setType] = useState("AUTOMOBILE");
  const [yearOfProduction, setYearOfProduction] = useState();
  const [numberOfSeats, setNumberOfSeats] = useState();
  const [pricePerDay, setPricePerDay] = useState();

  const [succcessModalVisibility, setSuccessModalVisibility] = useState(false);


  function handleCreate() {

    let errorCounter = 0;

    if (yearOfProduction === undefined || yearOfProduction < 1885) {
      setYearOfProduction(0);
      errorCounter++;
    }

    if (numberOfSeats === undefined || numberOfSeats < 1) {
      setNumberOfSeats(0)
      errorCounter++;
    }

    if (pricePerDay === undefined || pricePerDay <= 0) {
      setPricePerDay(0)
      errorCounter++;
    }

    if (brand === null || brand === "") {
      setBrand("")
      errorCounter++;
    }

    if (model === null || model === "") {
      setModel("")
      errorCounter++;
    }

    if (type === null || type === "") {
      setType("")
      errorCounter++;
    }

    if (errorCounter > 0)
      return;

    dispatch(createRentACarVehicle({
      vehicle: {
        brand,
        model,
        type,
        yearOfProduction,
        numberOfSeats,
        pricePerDay
      },
      rentACarId,
      callback: () => {
        setSuccessModalVisibility(true);
        setTimeout(() => {
          closeModal();
        }, 2000)
      }
    }));
  }

  return (
    <Container className={classes.vertical} maxWidth="sm">
      <SuccessInformation
        title={`Success`}
        content={`You have been successfully created ${brand} ${model} `}
        isVisible={succcessModalVisibility}
        handleClose={() => {
          setSuccessModalVisibility(false);
        }} />
      <TextFieldStyled
        requried
        label="Brand"
        className={classes.textField}
        margin="normal"
        onChange={({ currentTarget }) => {
          setBrand(currentTarget.value)
        }}
        error={brand === ""}
        helperText={brand === "" ? "Enter a brand of the vehicle." : ""}
      />
      <TextFieldStyled
        label="Model"
        className={classes.textField}
        margin="normal"
        onChange={({ currentTarget }) => {
          setModel(currentTarget.value)
        }}
        error={model === ""}
        helperText={model === "" ? "Enter a model of the vehicle." : ""}
      />
      <TextFieldStyled
        label="Type"
        className={classes.textField}
        margin="normal"
        onChange={({ target }) => {
          setType(target.value)
        }}
        select
        error={type === ""}
        helperText={type === "" ? "Choose one type of the vehicle." : ""}
        value={type}
      >
        <MenuItem maxHeight={25} value={`BICYCLE`}>Bicycle</MenuItem>
        <MenuItem maxHeight={25} value={`AUTOMOBILE`}>Automobile</MenuItem>
        <MenuItem maxHeight={25} value={`MOTORCYCLE`}>Motorcycle</MenuItem>
      </TextFieldStyled>
      <TextFieldStyled
        label="Year of production"
        type="number"
        className={classes.textField}
        margin="normal"
        onChange={({ currentTarget }) => {
          setYearOfProduction(currentTarget.value)
        }}
        error={yearOfProduction < 1885}
        helperText={yearOfProduction < 1885 ? "First car was inveted in 1885." : ""}
      />
      <TextFieldStyled
        label="Number of seats"
        className={classes.textField}
        margin="normal"
        type="number"
        onChange={({ currentTarget }) => {
          setNumberOfSeats(currentTarget.value)
        }}
        error={numberOfSeats < 1}
        helperText={numberOfSeats < 1 ? "Please make a car with the seats." : ""}
      />
      <TextFieldStyled
        label="Price per day"
        className={classes.textField}
        margin="normal"
        type="number"
        onChange={({ currentTarget }) => {
          setPricePerDay(currentTarget.value)
        }}
        error={pricePerDay <= 0}
        helperText={pricePerDay <= 0 ? "Please enter an positive number." : ""}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.btnCreate}
        onClick={handleCreate}
      >
        Create
      </Button>
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
  btnCreate: {
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

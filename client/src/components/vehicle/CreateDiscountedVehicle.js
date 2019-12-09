import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import dateFormat from "dateformat";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import SuccessInformation from "../UI/SuccessInformationModal";
import { discountVehicle } from "../../store/vehicle/actions";

export default function CreateDiscountedVehicle({ vehicle }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
  const [endDate, setEndDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
  const [discountRate, setDiscountRate] = useState();
  const [successModalVisibility, setSuccessModalVisibility] = useState(false);

  function handleConfirm() {
    dispatch(
      discountVehicle({
        vehicleId: vehicle.id,
        startDate,
        endDate,
        rate: discountRate,
        callback: () => {
          setSuccessModalVisibility(true);
        }
      })
    );
  }

  const marks = [
    {
      value: 0,
      label: "0%"
    },
    {
      value: 25,
      label: "25%"
    },
    {
      value: 50,
      label: "50%"
    },
    {
      value: 100,
      label: "100%"
    }
  ];

  function valuetext(value) {
    setDiscountRate(value);
    return `${value}%`;
  }

  function handleClose() {
    setSuccessModalVisibility(false)
  }

  return (
    <Container className={classes.vertical} maxWidth="sm">
      <SuccessInformation
        title={`Success`}
        content={`You have been successfully define discount!`}
        handleClose={handleClose}
        isVisible={successModalVisibility}
      />
      <strong>
        <Typography className={classes.typo}>
          Define discount for: {vehicle.brand} {vehicle.model}
        </Typography>{" "}
      </strong>
      <Container className={classes.horizontal} maxWidth="xl">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TextFieldStyled
            label="Vehicle"
            defaultValue={`${vehicle.brand} ${vehicle.model}`}
            className={classes.textField}
            margin="normal"
            type="text"
            InputProps={{
              readOnly: true,
            }}
          />
          <DatePickerStyled
            required
            className={classes.date}
            disableToolbar
            minDate={new Date()}
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Start date"
            value={startDate}
            onChange={date => setStartDate(dateFormat(date, "yyyy-mm-dd"))}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePickerStyled
            required
            className={classes.date}
            disableToolbar
            minDate={!!startDate ? startDate : new Date()}
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="End date"
            value={endDate}
            onChange={date => setEndDate(dateFormat(date, "yyyy-mm-dd"))}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </Container>
      <Slider
        className={classes.slider}
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={0}
        max={100}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.btnConfirm}
        onClick={handleConfirm}
      >
        Confirm
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
    textAlign: "center",
    alignItems: "center"
  },
  btnConfirm: {
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
  },
  textField: {
    width: 140
  },
  date: {
    width: 140,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  typo: {
    marginTop: 25
  },
  slider: {
    marginTop: 40,
    color: "#CEA027"
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
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
      color: '#CEA027',
    },
    '& .MuiInput-input': {
      color: '#CEA027',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#1A1B1C',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#CEA027',
    }
  },
})(TextField);

const DatePickerStyled = withStyles({
  root: {
    '& label': {
      color: '#1A1B1C',
    },
    '& label.Mui-focused': {
      color: '#CEA027',
    },
    '& .MuiInputBase-input': {
      color: '#CEA027',
    },
    '& .MuiInputBase-inputAdornedEnd': {
      color: '#CEA027',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#1A1B1C',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#CEA027',
    },
    '& .MuiSvgIcon-root': {
      color: '#CEA027',
    },
    '& .MuiPickersDay-current': {
      color: '#1A1B1C',
      background: '#1A1B1C'
    },
    '& .MuiIcon-label': {
      color: '#1A1B1C',
      background: '#1A1B1C'
    }
  },
})(KeyboardDatePicker);
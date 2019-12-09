import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from "material-table";
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import dateFormat from "dateformat";
import TextField from "@material-ui/core/TextField";
import CheckBox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {
  selectRentACarAvailableVehicles,
  selectRentACarDetails
} from "../../store/rent-a-car/selectors";
import { fetchRentACarVehiclesAvailability } from "../../store/rent-a-car/actions";

import { Container } from "@material-ui/core";

export default function Availability() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
  const [endDate, setEndDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
  const [available, setAvailable] = useState(false);

  const availableVehicles = useSelector(selectRentACarAvailableVehicles);
  const selectedRentACar = useSelector(selectRentACarDetails);

  useEffect(() => {
    dispatch(
      fetchRentACarVehiclesAvailability({
        id: selectedRentACar.id,
        startDate,
        endDate,
        available
      })
    );
  }, [])

  function handleShow() {
    dispatch(
      fetchRentACarVehiclesAvailability({
        id: selectedRentACar.id,
        startDate,
        endDate,
        available
      })
    );
  }

  function handleCheck(event) {
    setAvailable(event.target.checked);
  }

  const columns = [
    { title: "Brand", field: "brand" },
    { title: "Model", field: "model" },
    { title: "Year of production", field: "yearOfProduction" },
    { title: "Number of seats", field: "numberOfSeats" }
  ];

  return (
    <Container className={classes.vertical} maxWidth="md">
      <Container className={classes.horizontal} maxWidth="md">
        <TextFieldStyled
          label="Name"
          defaultValue={selectedRentACar.name}
          className={classes.textField}
          margin="normal"
          type="text"
          InputProps={{
            readOnly: true,
          }}
        />
        <div className={classes.date}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.date}>
            <DatePickerStyled
              disableToolbar
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
        </div>
        <div className={classes.date}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.date}>
            <DatePickerStyled
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
        </div>
        <Tooltip title={available === true ? "Show unavailable vehicles" : "Show available vehicles"}>
          <CheckBox
            className={classes.check}
            onChange={handleCheck}
            defaultValue={false}
          ></CheckBox>
        </Tooltip>
        <Button
          variant="contained"
          className={classes.btnShow}
          onClick={handleShow}
        >
          Show
        </Button>
      </Container>
      <Container className={classes.table}>
        <MaterialTable
          title={available ? "Available " : "Unvailable"}
          columns={columns}
          data={availableVehicles}
        />
      </Container>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  vertical: {
    marginTop: theme.spacing(4),
    marginBottom: 25,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    border: "2px solid #CEA33F",
    boxShadow: theme.shadows[7],
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 15,
  },
  btnShow: {
    marginBottom: 25,
    marginLeft: 25,
    marginTop: 30,
    height: 35,
    background: "#1A1B1C",
    color: "#CEA027",
    '&:hover': {
      background: "#CEA027",
      color: "#1A1B1C",
    }
  },
  check: {
    marginTop: 10,
    color: "#CEA027",
    "&:hover": {
      background: "transparent"
    },
  },
  date: {
    marginRight: 25
  },
  table: {
    marginBottom: 25
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: 25,
    flex: 1,
    width: "auto"
  },
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


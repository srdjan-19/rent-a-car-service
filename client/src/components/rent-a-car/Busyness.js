import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import dateFormat from "dateformat";
import TextField from "@material-ui/core/TextField";
import { VictoryBar, VictoryChart } from "victory";
import { selectRentACarDetails, selectRentACarVehiclesBusyness } from "../../store/rent-a-car/selectors";
import { fetchRentACarVehiclesBusyness } from "./../../store/rent-a-car/actions";

export default function Busyness() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rentACar = useSelector(selectRentACarVehiclesBusyness);
  const [startDate, setStartDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
  const [endDate, setEndDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));

  const selectedRentACar = useSelector(selectRentACarDetails);

  useEffect(() => {
    dispatch(
      fetchRentACarVehiclesBusyness({
        id: selectedRentACar.id,
        startDate: startDate,
        endDate: endDate
      })
    );
  })

  function handleShow() {
    dispatch(
      fetchRentACarVehiclesBusyness({
        id: selectedRentACar.id,
        startDate: startDate,
        endDate: endDate
      })
    );
  }

  return (
    <Container className={classes.vertical} maxWidth="md">
      <Container className={classes.horizontal}>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
        <Button
          variant="contained"
          color="primary"
          className={classes.btnShow}
          onClick={handleShow}
        >
          Show
          </Button>
      </Container>
      <Container>
        <VictoryChart width={850} height={500} domainPadding={15} >
          <VictoryBar
            data={rentACar}
            x="vehicle"
            y="busyness"
            alingment="start"
            style={{ data: { fill: "#CEA027", width: 20 }, labels: { fill: "#CEA027" } }}
          />
        </VictoryChart>
      </Container>
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
  horizontal: {
    display: "flex",
    flexDirection: "row",
    marginTop: 25
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: 25,
    flex: 1,
  },
  date: {
    marginRight: 25
  },
  margin: {
    margin: theme.spacing(1)
  },
  btnShow: {
    marginTop: 25,
    marginBottom: "auto",
    marginRight: "auto",
    marginLeft: 15,
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



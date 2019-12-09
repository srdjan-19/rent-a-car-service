import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import dateFormat from "dateformat";
import TextField from "@material-ui/core/TextField";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { fetchRentACarVehiclesIncome } from "./../../store/rent-a-car/actions";
import { selectRentACarDetails, selectRentACarVehiclesIncome } from "../../store/rent-a-car/selectors";

export default function Income() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedRentACar = useSelector(selectRentACarDetails);
  const rentACar = useSelector(selectRentACarVehiclesIncome);

  const [startDate, setStartDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
  const [endDate, setEndDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));

  useEffect(() => {
    dispatch(
      fetchRentACarVehiclesIncome({
        id: selectedRentACar.id,
        startDate: startDate,
        endDate: endDate
      })
    );
  }, [])

  function handleShow() {
    dispatch(
      fetchRentACarVehiclesIncome({
        id: selectedRentACar.id,
        startDate: startDate,
        endDate: endDate
      })
    );
  }

  return (
    <Container className={classes.paper} maxWidth="md">
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
        <VictoryChart width={850} height={500} domainPadding={15} theme={VictoryTheme.material} >
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            width={100}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={x => `$${x / 1000}k`}
            width={200}
          />
          <VictoryBar
            data={rentACar}
            x="vehicle"
            y="income"
            style={{ data: { fill: "#CEA027", width: 25 } }}>
          </VictoryBar>
        </VictoryChart>
      </Container>
    </Container >
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
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
  date: {
    marginRight: 25
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: 25,
    flex: 1,
    width: "auto"
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

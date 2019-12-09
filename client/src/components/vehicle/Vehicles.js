import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Container, Typography, Modal } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import dateFormat from "dateformat";
import Background from "../../assets/background.jpg";
import RentACarVehicle from "./Vehicle";
import CreateVehicle from "./CreateVehicle";
import { selectRentACarVehicles, selectVehicleSearchCriteria } from "../../store/vehicle/selectors";
import { fetchRentACarVehicles, fetchRentACarDiscountedVehicles } from "../../store/vehicle/actions";
import { searchVehicles, sortVehicles } from "../../store/vehicle/actions";
import { putError } from "../../store/common/actions";

export default function RentACarVehicles({ rentACarId }) {
  const role = window.localStorage.getItem("role");
  const vehicles = useSelector(selectRentACarVehicles);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createModalVisibility, setCreateModalVisibility] = useState(false);

  const criteria = useSelector(selectVehicleSearchCriteria);
  const [pickUpDate, setPickUpDate] = useState(criteria.pickUpDate);
  const [dropOffDate, setDropOffDate] = useState(criteria.dropOffDate);
  const [pickUpLocation, setPickUpLocation] = useState(criteria.pickUpLocation);
  const [dropOffLocation, setDropOffLocation] = useState(criteria.dropOffLocation);
  const [type, setType] = useState("");
  const [seats, setSeats] = useState(0);
  const [price, setPrice] = useState({
    min: 0,
    max: 10000
  });


  function handleClose() {
    setCreateModalVisibility(false);
  }

  useEffect(() => {

    if (criteria.pickUpLocation === "" && criteria.dropOffLocation === "") {
      dispatch(
        fetchRentACarVehicles({
          rentACarId
        })
      );

      dispatch(
        fetchRentACarDiscountedVehicles({
          rentACarId: rentACarId,
          pickUpDate,
          dropOffDate
        })
      );
    } else {
      handleSearch();
    }

  }, []);

  function handleSearch() {

    let errorCounter = 0;

    if (pickUpLocation === null || pickUpLocation === "") {
      setPickUpLocation("");
      errorCounter++;
    }

    if (dropOffLocation === null || dropOffLocation === "") {
      setDropOffLocation("");
      errorCounter++;
    }

    if (pickUpDate > dropOffDate) {
      errorCounter++;
      dispatch(putError("Pick up date must be before drop off date!"));
    }

    if (errorCounter > 0)
      return;

    dispatch(
      searchVehicles({
        pickUpDate,
        dropOffDate,
        pickUpLocation,
        dropOffLocation,
        type,
        seats,
        startRange: price.min,
        endRange: price.max,
        rentACarId
      })
    );

    dispatch(
      fetchRentACarDiscountedVehicles({
        rentACarId: rentACarId,
        pickUpDate,
        dropOffDate
      })
    );

  }

  function handleSortByBrand() {
    dispatch(sortVehicles({ by: "brand", rentACarId: rentACarId }));
  }

  function handleSortByModel() {
    dispatch(sortVehicles({ by: "model", rentACarId: rentACarId }));
  }

  function handleSortByYop() {
    dispatch(sortVehicles({ by: "yearOfProduction", rentACarId: rentACarId }));
  }

  function handleSortByRating() {
    dispatch(sortVehicles({ by: "rating", rentACarId: rentACarId }));
  }

  return (
    <div className={classes.root}>
      <Modal open={createModalVisibility} onClose={handleClose} className={classes.modal}>
        <CreateVehicle rentACarId={rentACarId} closeModal={handleClose} />
      </Modal>
      <Container maxWidth="xl" className={classes.horizontal}>
        <Typography className={classes.header}>Vehicles</Typography>
        {role === "RENT_A_CAR_ADMIN" ? (
          <Icon onClick={() => setCreateModalVisibility(true)} className={classes.btnCreate}>
            add_circle
            </Icon>
        ) : null}
      </Container>
      <Container maxWidth="xl">
        <TextFieldStyled
          required
          value={pickUpLocation}
          label="Pick up location"
          className={classes.textField}
          margin="normal"
          onChange={({ currentTarget }) =>
            setPickUpLocation(currentTarget.value)
          }
          error={pickUpLocation === ""}
          helperText={pickUpLocation === "" ? "Please enter pick up location." : ""}
        />
        <TextFieldStyled
          required
          value={dropOffLocation}
          label="Drop off location"
          className={classes.textField}
          margin="normal"
          onChange={({ currentTarget }) =>
            setDropOffLocation(currentTarget.value)
          }
          error={dropOffLocation === ""}
          helperText={dropOffLocation === "" ? "Please drop off location." : ""}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePickerStyled
            disableToolbar
            className={classes.date}
            minDate={new Date()}
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Pick up date"
            value={pickUpDate}
            onChange={date => setPickUpDate(dateFormat(date, "yyyy-mm-dd"))}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePickerStyled
            disableToolbar
            className={classes.date}
            minDate={!!pickUpDate ? pickUpDate : new Date()}
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Drop off date"
            value={dropOffDate}
            onChange={date => setDropOffDate(dateFormat(date, "yyyy-mm-dd"))}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </Container>
      <Container maxWidth="xl">
        <TextFieldStyled
          required
          label="Type"
          className={classes.textField}
          margin="normal"
          onChange={({ currentTarget }) => setType(currentTarget.value)}
        />
        <TextFieldStyled
          label="Number of people"
          className={classes.textField}
          margin="normal"
          type="number"
          onChange={({ currentTarget }) => setSeats(currentTarget.value)}
        />
        <TextFieldStyled
          label="Price from"
          defaultValue={price.min}
          className={classes.textField}
          onChange={({ currentTarget }) =>
            setPrice(currState => ({
              ...currState,
              min: currentTarget.value
            }))
          }
          margin="normal"
          type="number"
        />
        <TextFieldStyled
          label="Price to"
          defaultValue={price.max}
          className={classes.textField}
          onChange={({ currentTarget }) =>
            setPrice(currState => ({
              ...currState,
              max: currentTarget.value
            }))
          }
          margin="normal"
          type="number"
        />
        <Button
          justify="center"
          variant="contained"
          color="primary"
          className={classes.btnSearch}
          onClick={handleSearch}
        >
          Search
          </Button>
      </Container>
      <br />
      <ButtonGroup
        size="small"
        aria-label="small outlined button group"
        className={classes.btnGroup}
      >
        <Button className={classes.btnSortBy} disabled>SORT BY</Button>
        <Button className={classes.btnSortByAttr} onClick={handleSortByBrand}>
          BRAND
        </Button>
        <Button className={classes.btnSortByAttr} onClick={handleSortByModel}>
          MODEL
        </Button>
        <Button className={classes.btnSortByAttr} onClick={handleSortByYop}>
          YEAR OF PRODUCTION
        </Button>
        <Button className={classes.btnSortByAttr} onClick={handleSortByRating}>
          RATING
        </Button>
      </ButtonGroup>
      {vehicles.length !== 0 ?
        <Container maxWidth="xl" className={classes.horizontal}>
          {
            Object.keys(vehicles).map(index => (
              < RentACarVehicle key={vehicles[index].id} vehicle={vehicles[index]} />
            ))
          }
        </Container>
        :
        <Typography className={classes.searchFailed}>
          We could not found any vehicles for your requirments.
          <br />
          For pick up and drop off location enter the office city.
          <br />
          Please try again.
        </Typography>}
    </div >
  );
}

const useStyles = makeStyles(theme => ({
  header: {
    textAlign: "center",
    color: "#1A1B1C",
    fontFamily: "Roboto",
    textTransform: "uppercase",
    fontSize: 24
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    background: `url(${Background})`
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: `url(${Background})`,
    marginTop: 15,
  },
  box: {
    backgroundImage: `url(${Background})`,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flex: 1
  },
  date: {
    width: 180,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(1)
  },
  btnSearch: {
    margin: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 25,
    background: "#1A1B1C",
    color: "#CEA027",
    '&:hover': {
      background: "#CEA027",
      color: "#1A1B1C",
    }
  },
  btnCreate: {
    color: "#CEA027",
    '&:hover': {
      color: "#1A1B1C",
    }
  },
  btnSortByAttr: {
    background: "#1A1B1C",
    color: "#CEA027",
    marginBottom: 20,
    border: '1px solid #CEA027',
    '&:hover': {
      background: "#CEA027",
      color: "#1A1B1C",
    }
  },
  btnSortBy: {
    marginBottom: 20,
    border: '1px solid #CEA027',
    '&:disabled': {
      color: "#1A1B1C",
      background: "#CEA027",

    },
  },
  btnGroup: {
    margin: (25, 25, 25, 35),
    display: "flex",
    alignItems: 'center',
    flexWrap: "wrap"
  },
  searchFailed: {
    marginBottom: 50,
    marginTop: 25,
    textAlign: "center",
    color: "red",
    fontSize: 20,
    fontFamily: "Corbel"
  }
}));

const TextFieldStyled = withStyles({
  root: {
    '& label': {
      color: '#CEA027',
    },
    '& label.Mui-focused': {
      color: '#CEA027',
    },
    '& .MuiInputBase-input': {
      color: '#CEA027',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#CEA027',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#CEA027',
    }
  },
})(TextField);

const DatePickerStyled = withStyles({
  root: {
    '& label': {
      color: '#CEA027',
    },
    '& label.Mui-focused': {
      color: '#CEA027',
    },
    '& .MuiInputBase-input': {
      color: '#CEA027',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#CEA027',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#CEA027',
    },
    '& .MuiSvgIcon-root': {
      color: '#CEA027',
    }
  },
})(KeyboardDatePicker);

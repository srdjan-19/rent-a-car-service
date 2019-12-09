import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SuccessInformation from "../UI/SuccessInformationModal";
import { createRentACar } from "./../../store/rent-a-car/actions";

export default function CreateRentACar({ closeModal }) {
  const mapRef = React.createRef();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [street, setStreet] = useState();
  const [location, setLocation] = useState({
    latlng: {
      lat: 45.275,
      lng: 19.841
    }
  });

  const [successModalVisibility, setSuccessModalVisibility] = useState(false);

  useEffect(() => {
    if (mapRef !== null) {
      mapRef.current.leafletElement.locate();
    }
  }, []);


  function setLatLng({ latlng }) {
    setLocation({ latlng });
  }

  function handleSave() {

    let errorCounter = 0;

    if (name == null) {
      setName("")
      errorCounter++;
    }

    if (description == null) {
      setDescription("")
      errorCounter++;
    }

    if (street == null) {
      setStreet("")
      errorCounter++;
    }

    if (errorCounter > 0)
      return

    dispatch(createRentACar({
      name,
      description,
      location,
      street,
      callback: () => {
        setSuccessModalVisibility(true);
        setTimeout(() => {
          closeModal();
        }, 1000)
      }
    }));
  }

  function handleClose() {
    setSuccessModalVisibility(false);
  }

  return (
    <Container className={classes.paper} maxWidth="md">
      <SuccessInformation
        title={`Success`}
        content={`You have been successfully creted an rant a car service!`}
        handleClose={handleClose}
        isVisible={successModalVisibility}
      />
      <Container className={classes.vertical}>
        <TextFieldStyled
          required
          label="Name"
          className={classes.textField}
          margin="normal"
          onChange={({ currentTarget }) => {
            setName(currentTarget.value);
          }}
          error={name === ""}
          helperText={name === "" ? "Please enter name." : ""}
        />
        <TextFieldStyled
          required
          label="Description"
          className={classes.textField}
          margin="normal"
          onChange={({ currentTarget }) => {
            setDescription(currentTarget.value);
          }}
          error={description === ""}
          helperText={description === "" ? "Please enter description." : ""}
        />
        <TextFieldStyled
          required
          label="Street"
          className={classes.textField}
          margin="normal"
          onChange={({ currentTarget }) => {
            setStreet(currentTarget.value);
          }}
          error={street === ""}
          helperText={street === "" ? "Please enter street." : ""}
        />
        <Map
          className={classes.map}
          style={{ height: 350 }}
          center={location.latlng}
          length={4}
          onClick={e => {
            setLatLng(e);
          }}
          ref={mapRef}
          zoom={10}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location.latlng}>
            <Popup>Selected Location</Popup>
          </Marker>
        </Map>
      </Container>
      <Button
        variant="contained"
        color="primary"
        className={classes.btnConfirm}
        onClick={handleSave}
      >
        Confirm
      </Button>
    </Container>
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
    width: "100%"
  },
  map: {
    marginBottom: 25,
    marginTop: 25,
    paddingLeft: 5,
    paddingRight: 5
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flex: 1,
    width: 220
  },
  btnConfirm: {
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
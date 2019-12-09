import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { createRentACarOffice } from "./../../store/rent-a-car/actions";

export default function CreateOffice({ rentACarId, closeModal }) {
  const mapRef = React.createRef();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [location, setLocation] = useState({
    latlng: {
      lat: 45.275,
      lng: 19.841
    },
  });
  const [street, setStreet] = useState();

  useEffect(() => {
    if (mapRef !== null) {
      mapRef.current.leafletElement.locate();
    }
  }, [mapRef]);

  function setLatLng({ latlng }) {
    setLocation({ latlng });
  }

  function handleSave() {

    if (street === null || street === "" || street === undefined) {
      setStreet("");
      return;
    }

    dispatch(createRentACarOffice({
      location,
      street,
      rentACarId,
      callback: () => {
        closeModal();
      }
    }));
  }

  return (
    <Container className={classes.paper} maxWidth="md">
      <Container className={classes.horizontal} maxWidth="sm">
        <TextFieldStyled
          label="Street"
          className={classes.textField}
          margin="normal"
          onChange={({ currentTarget }) => {
            setStreet(currentTarget.value);
          }}
          error={street === ""}
          helperText={street === "" ? "Please enter street." : ""}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.btnSave}
          onClick={handleSave}
        >
          Save
      </Button>
      </Container>
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
    flex: 1
  },
  btnSave: {
    margin: theme.spacing(1),
    marginLeft: "auto",
    height: "40%",
    marginTop: 25,
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
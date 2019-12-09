import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { updateRentACarDetails } from "./../../store/rent-a-car/actions";
import { selectRentACarDetails } from "./../../store/rent-a-car/selectors";

export default function EditRentACar({ closeModal }) {
  const mapRef = React.createRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedRentACar = useSelector(selectRentACarDetails);
  const [name, setName] = useState("");
  const [description, setDescription] = useState(selectedRentACar.description);

  const [location, setLocation] = useState({
    latlng: {
      lat: selectedRentACar.address.latitude,
      lng: selectedRentACar.address.longitude
    }
  });
  const [street, setStreet] = useState(selectedRentACar.address.street);


  function setLatLng({ latlng }) {
    setLocation({ latlng });
  }

  useEffect(() => {
    if (mapRef !== null) {
      mapRef.current.leafletElement.locate();
    }
  }, [mapRef]);

  function handleSaveButton() {
    const id = selectedRentACar.id;
    dispatch(updateRentACarDetails({
      id,
      name,
      description,
      location,
      street,
      callback: () => {
        closeModal();
      }
    }));
  }

  return (
    <Container className={classes.vertical} maxWidth="md">
      <Container className={classes.horizontal}>
        <TextFieldStyled
          label="Name"
          defaultValue={selectedRentACar.name}
          className={classes.textField}
          margin="normal"
          onChange={({ currentTarget }) => {
            setName(currentTarget.value);
          }}
        />
        <TextFieldStyled
          label="Description"
          className={classes.textField}
          defaultValue={selectedRentACar.description}
          margin="normal"
          onChange={({ currentTarget }) => {
            setDescription(currentTarget.value);
          }}
        />
        <TextFieldStyled
          label="Street"
          className={classes.textField}
          defaultValue={selectedRentACar.address.street}
          margin="normal"
          onChange={({ currentTarget }) => {
            setStreet(currentTarget.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.btnSave}
          onClick={handleSaveButton}
        >
          Save
      </Button>
      </Container>
      <Container className={classes.map}>
        <Map
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
    flex: 1
  },
  btnSave: {
    margin: theme.spacing(1),
    alignItems: "center",
    marginTop: 25,
    marginBottom: "auto",
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



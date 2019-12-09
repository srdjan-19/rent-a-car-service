import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const ISAMap = ({ address, setStreet = () => { }, hasClick = true, width, height }) => {
  const mapRef = React.createRef();
  const classes = useStyles();

  const [location, setLocation] = useState({
    latlng: {
      lat: 42,
      lng: 41
    }
  });

  function setLatLng({ latlng }) {
    setLocation({ latlng });
  }

  useEffect(() => {
    if (mapRef !== null) {
      mapRef.current.leafletElement.locate();
    }
  }, [mapRef]);

  useEffect(() => {
    if (!hasClick) {
      setLocation({
        latlng: {
          lat: address.latitude,
          lng: address.longitude
        }
      });
    }
  }, [hasClick, address]);

  return (
    <Container
      className={classes.vertical}
      style={{ width: width, height: height }}
      maxWidth="xl"
    >
      <Container
        className={classes.horizontal}
        maxWidth="xl"
      >
        <TextFieldStyled
          label="State"
          className={classes.textField}
          margin="normal"
          value={address.state}
          InputProps={{
            readOnly: true
          }}
        />
        <TextFieldStyled
          label="Street"
          className={classes.textField}
          margin="normal"
          value={address.street}
          onChange={({ currentTarget }) => setStreet(currentTarget.value)}
          InputProps={{
            readOnly: !hasClick
          }}
        />
      </Container>
      <Map
        style={{ height: 500 }}
        center={location.latlng}
        length={4}
        onClick={e => {
          if (hasClick) {
            setLatLng(e);
          }
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
};

const useStyles = makeStyles(theme => ({
  vertical: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 25,
    width: "100%"
  },
  horizontal: {
    padding: "0px 0px 0px 0px",
    display: "flex",
    flexDirection: "row",
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
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

export default ISAMap;

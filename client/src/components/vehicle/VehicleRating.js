import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "react-rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { Typography, Container } from "@material-ui/core";
import { rateVehicle } from "../../store/vehicle/actions";

export default function VehicleReservationRating({ reservation, handleClose = () => { } }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  function handleRating(value) {
    dispatch(
      rateVehicle({
        reservationId: reservation.reservationId,
        mark: value,
        callback: () => {
          handleClose();
        }
      })
    );
  }

  return (
    <Container className={classes.vertical} maxWidth="sm">
      <Typography className={classes.title}><h2>Your rate for vehicle {reservation.vehicle} </h2></Typography>
      <Rating
        className={classes.rating}
        emptySymbol={<StarBorderIcon></StarBorderIcon>}
        fullSymbol={<StarIcon></StarIcon>}
        onClick={handleRating}
        stop={10}
      ></Rating>
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
    alignItems: "center "
  },
  title: {
    color: "#1A1B1C",
    marginTop: 25,
    fontFamily: "Corbel"
  },
  rating: {
    color: "#1A1B1C",
    marginBottom: 25,
    '&:hover': {
      color: "#CEA027",
    }
  }
}));
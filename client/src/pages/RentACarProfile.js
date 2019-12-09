import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RentACarVehicles from "../components/vehicle/Vehicles";
import RentACarInformation from "../components/rent-a-car/Information";
import RentACarDiscountedVehicles from "../components/vehicle/DiscountedVehicles";
import Container from "@material-ui/core/Container";
import RentACarOffices from "../components/rent-a-car/Offices";
import { makeStyles } from "@material-ui/core/styles";
import Background from "../assets/background.jpg";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import { selectRentACarDetails } from "../store/rent-a-car/selectors";
import { selectRentACarVehicles } from "../store/vehicle/selectors";
import { fetchRentACarVehicles } from "../store/vehicle/actions";

export default function RentACarProfilePage({ match, location }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selected = useSelector(selectRentACarDetails)
  const vehicles = useSelector(selectRentACarVehicles)

  useEffect(() => {
    dispatch(fetchRentACarVehicles(
      {
        rentACarId: match.params.id
      })
    )
  }, [match.params.id])

  return (
    <div className={classes.bckg}>
      <Container maxWidth="xl">
        <Typography variant="h3" className={classes.header}>{selected.name}</Typography>
        <RentACarDiscountedVehicles rentACarId={match.params.id} />
        <Divider variant="fullWidth" orientation="horizontal"></Divider>
        <Container maxWidth="xl">
          <RentACarInformation rentACarId={match.params.id} />
        </Container>
        <Divider variant="fullWidth" orientation="horizontal"></Divider>
        <RentACarOffices rentACarId={match.params.id} />
        <Divider variant="fullWidth" orientation="horizontal"></Divider>
        <RentACarVehicles rentACarId={match.params.id} rentACarVehicles={vehicles} />
        <Divider variant="fullWidth" orientation="horizontal"></Divider>
      </Container>
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  bckg: {
    backgroundImage: `url(${Background})`,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center"
  },
  header: {
    textAlign: "center",
    color: "#1A1B1C",
    fontFamily: "Corbel",
    textTransform: "uppercase",
    marginTop: 25,
    marginBottom: 25,
    letterSpacing: 5
  }
}));


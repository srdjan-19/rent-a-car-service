import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Background from "../assets/polygon.jpg";
import SortAndSearch from "../components/rent-a-car/SortAndSearch";
import RentACar from "../components/rent-a-car/RentACar";
import {
  selectRentACars,
} from "../store/rent-a-car/selectors";
import {
  fetchRentACars,
  fetchOffices,
} from "../store/rent-a-car/actions";

export default function RentACarPage({ history, location }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const rentACars = useSelector(selectRentACars);

  useEffect(() => {
    dispatch(fetchRentACars());
  }, []);

  useEffect(() => {
    dispatch(fetchOffices());
  }, []);

  return (
    <Container className={classes.vertical} maxWidth="xl">
      <SortAndSearch />
      <Divider
        variant="fullWidth"
        orientation="horizontal"
        className={classes.divider}
      />
      {rentACars.map(rentACar => (
        <Container key={rentACar.id} className={classes.horizontal} maxWidth="xl">
          <RentACar rentACar={rentACar} location={location} history={history} />
          <Divider
            variant="fullWidth"
            orientation="horizontal"
            className={classes.divider}
          />
        </Container>
      ))}
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  vertical: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    background: `url(${Background})`
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 20,
    marginTop: 25
  },
  divider: {
    marginTop: 15,
    marginBottom: 15,
    color: ""
  },
}));

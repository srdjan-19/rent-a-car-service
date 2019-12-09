import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Container from "@material-ui/core/Container";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VehiclesReservation from "../components/vehicle/VehiclesReservationHistory";
import { fetchUserVehiclesReservation } from "../store/user/actions";

export default function HomeAuthUserPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const role = window.localStorage.getItem("role")

  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (role === "USER") {
      dispatch(fetchUserVehiclesReservation());
    }
  }, [role, dispatch]);

  return (
    <Container className={classes.root}>
      <ExpansionPanel
        className={classes.expansion}
        expanded={expanded === "vehiclesReservation"}
        onChange={handleChange("vehiclesReservation")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="vehiclesReservation-bh-content"
          id="vehiclesReservation-bh-header"
        >
          <Typography className={classes.heading}>
            YOURS VEHICLES RESERVATIONS
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Container maxWidth="lg">
            <VehiclesReservation></VehiclesReservation>
          </Container>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 25,
    marginBottom: 25
  },
  heading: {
    color: "#FFFFFF",
    flexBasis: "100%",
    flexShrink: 0,
    fontFamily: "Roboto",
    fontWeight: "Bold",
    fontSize: 15
  },
  expansion: {
    background: "#1A1B1C"
  }
}));

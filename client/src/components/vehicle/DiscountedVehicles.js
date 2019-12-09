import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Background from "../../assets/background.jpg";
import DiscountedVehicle from "./DiscountedVehicle";
import { selectRentACarVehiclesOnDiscount, selectVehicleSearchCriteria } from "../../store/vehicle/selectors";
import { fetchRentACarDiscountedVehicles } from "../../store/vehicle/actions";

export default function DiscountedVehicles({ rentACarId, location }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const discountedVehicles = useSelector(selectRentACarVehiclesOnDiscount);
  const criteria = useSelector(selectVehicleSearchCriteria);

  useEffect(() => {
    dispatch(fetchRentACarDiscountedVehicles({
      rentACarId,
      pickUpDate: criteria.pickUpDate,
      dropOffDate: criteria.dropOffDate
    }))
  }, [])

  if (discountedVehicles == null)
    return <div></div>

  return (
    <Container className={classes.horizontal} maxWidth="xl">
      {Object.keys(discountedVehicles).map(index => (
        <DiscountedVehicle key={discountedVehicles[index].id} discountedVehicle={discountedVehicles[index]} />
      ))}
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  horizontal: {
    alignItems: "center",
    backgroundImage: `url(${Background})`,
  },
  vertical: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    backgroundImage: `url(${Background})`,
  }
}));

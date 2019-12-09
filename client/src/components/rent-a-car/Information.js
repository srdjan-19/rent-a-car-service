import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import img from "../../assets/vehicle.png";
import {
  fetchRentACarDetails,
  fetchRentACarLocationInformation
} from "../../store/rent-a-car/actions";
import {
  selectRentACarDetails
} from "../../store/rent-a-car/selectors";
import ISAMap from "../UI/ISAMap";

export default function RentACarInformation({ rentACarId }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const rentACar = useSelector(selectRentACarDetails);

  useEffect(() => {
    dispatch(
      fetchRentACarDetails(rentACarId),
      fetchRentACarLocationInformation(rentACar.address)
    );
  }, []);

  return (
    <div className={classes.horizontal}>
      <img className={classes.img} src={img} alt="Vehicle" />
      <div>
        {rentACar.address && (
          <ISAMap
            address={rentACar.address}
            hasClick={false}
            width={"100%"}
            heigth={"50%"}
          />
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  horizontal: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 40,
    marginBottom: 25
  },
  img: {
    width: "50%",
    height: "50%"
  }
}));

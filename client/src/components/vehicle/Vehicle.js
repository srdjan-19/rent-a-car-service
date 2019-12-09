import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Button, Modal, Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import Rating from "react-rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import ConfirmationDialog from "../UI/ConfirmationDialog";
import EditVehicle from "./EditVehicle";
import CreateDiscountedVehicle from "./CreateDiscountedVehicle";
import { selectVehicleSearchCriteria } from "../../store/vehicle/selectors";
import { createVehicleReservation } from "../../store/vehicle/actions";
import { deleteRentACarVehicle } from "../../store/vehicle/actions";
import { putError } from "../../store/common/actions";
import CardBackground from "../../assets/card_bckg.jpg";
import SuccessInformation from "../UI/SuccessInformationModal";

export default function RentACarVehicle({ vehicle }) {
  const role = window.localStorage.getItem("role");
  const classes = useStyles();
  const dispatch = useDispatch();

  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [deleteDialogVisibility, setDeleteDialogVisibility] = useState(false);
  const [discountModalVisibility, setDiscountModalVisibility] = useState(false);
  const [successModalVisibility, setSuccessModalVisibility] = useState(false);

  const [selected, setSelected] = useState({ brand: "", model: "" });

  const criteria = useSelector(selectVehicleSearchCriteria);

  function handleReserve() {
    if (criteria.pickUpLocation === "" || criteria.pickUpLocation === null || criteria.pickUpLocation === undefined ||
      criteria.dropOffLocation === "" || criteria.dropOffLocation === null || criteria.dropOffLocation === undefined) {

      dispatch(
        putError("You need to set pick up and drop off location first!")
      );

      return;

    } else {
      setSelected(vehicle);

      dispatch(
        createVehicleReservation({
          vehicleId: vehicle.id,
          pickUpDate: criteria.pickUpDate,
          dropOffDate: criteria.dropOffDate,
          pickUpLocation: criteria.pickUpLocation,
          dropOffLocation: criteria.dropOffLocation,
          callback: () => {
            setSuccessModalVisibility(true);
            setTimeout(() => {
              setSuccessModalVisibility(true);

            }, 2000)
          }
        })
      );

    }
  }

  function handleDelete() {
    dispatch(deleteRentACarVehicle(
      {
        id: vehicle.id,
        callback: () => {
          setDeleteDialogVisibility(false)
        }
      }
    ));
  }

  function handleClose() {
    setEditModalVisibility(false);
    setDiscountModalVisibility(false);
    setSuccessModalVisibility(false);
  }

  return (
    <Card key={vehicle.id} className={classes.card}>
      <ConfirmationDialog
        isVisible={deleteDialogVisibility}
        title={`Are you sure you want to delete vehicle ${vehicle.brand}  ${vehicle.model} ?`}
        handleClose={() => {
          setDeleteDialogVisibility(false);
        }}
        callYesAction={() => handleDelete()}
      />
      <SuccessInformation
        title={`Success`}
        content={`You reserverd ${selected.brand} ${selected.model} `}
        isVisible={successModalVisibility}
        handleClose={handleClose}
      />
      <Modal open={editModalVisibility} onClose={handleClose} className={classes.modal}>
        <EditVehicle vehicle={vehicle} closeModal={handleClose} />
      </Modal>
      <Modal open={discountModalVisibility} onClose={handleClose} className={classes.modal}>
        <CreateDiscountedVehicle vehicle={vehicle} closeModal={handleClose} />
      </Modal>
      <CardContent>
        <Typography variant="h5" component="h2">
          {vehicle.brand} {vehicle.model}
        </Typography>
        <Typography color="textSecondary">{vehicle.type}</Typography>
        <br />
        <Typography variant="body2">
          Manufactured: <strong>{vehicle.yearOfProduction}.</strong>
          <br />
          Price: <strong>{vehicle.pricePerDay}$</strong>.
          <br />
          <Rating
            readonly={true}
            className={classes.rating}
            initialRating={vehicle.numberOfSeats}
            stop={vehicle.numberOfSeats}
            fullSymbol={<AccessibilityIcon></AccessibilityIcon>}
            emptySymbol={<AccessibilityIcon></AccessibilityIcon>}>
          </Rating>
          <br />
          <Rating
            readonly={true}
            className={classes.rating}
            initialRating={vehicle.rating}
            stop={10}
            emptySymbol={<StarBorderIcon></StarBorderIcon>}
            fullSymbol={<StarIcon></StarIcon>}>
          </Rating>
        </Typography>
        <br />
        {role === "USER" ? (
          <Typography variant="body2" component="p">
            If you want to reserve this vehicle click on{" "}
            <strong>RESERVE</strong>
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        {role === "RENT_A_CAR_ADMIN" ? (
          <Container className={classes.horizontal} >
            <Tooltip title="Update">
              <Button
                className={classes.btn}
                onClick={() => setEditModalVisibility(true)}>
                <UpdateIcon
                  fontSize="inherit"
                />
              </Button>
            </Tooltip>
            <Tooltip title="Discount">
              <Button
                className={classes.btn}
                onClick={() => setDiscountModalVisibility(true)}>
                <LocalAtmIcon
                  fontSize="inherit"
                />
              </Button>
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                className={classes.btn}
                onClick={() => {
                  setDeleteDialogVisibility(true);
                }}>
                <DeleteIcon
                  fontSize="inherit"
                />
              </Button>
            </Tooltip>
          </Container>
        ) : null}
        {role === "USER" ? (
          <Tooltip title="Reserve">
            <Button onClick={() => handleReserve()} className={classes.btn}>
              Reserve
            </Button>
          </Tooltip>
        ) : null}
      </CardActions>
    </Card >
  );
}

const useStyles = makeStyles(theme => ({
  horizontal: {
    display: "flex",
    flexDirection: "row",
  },
  rating: {
    marginTop: 20
  },
  card: {
    width: 280,
    marginBottom: 25,
    marginRight: 35,
    padding: 15,
    paddingBottom: 25,
    backgroundImage: `url(${CardBackground})`,
    textAlign: "center",
    backgroundSize: "cover"
  },
  title: {
    fontSize: 14
  },
  btn: {
    background: "#1A1B1C",
    color: "#CEA027",
    '&:hover': {
      background: "#CEA027",
      color: "#1A1B1C",
    },
    marginLeft: "auto",
    marginRight: "auto",
  }
}));

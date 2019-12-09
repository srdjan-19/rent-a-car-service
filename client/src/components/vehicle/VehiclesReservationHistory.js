import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import RentACarRating from "../rent-a-car/RentACarRating";
import VehicleRating from "./VehicleRating";
import SuccessInformation from "../UI/SuccessInformationModal";
import ConfirmationDialog from "../UI/ConfirmationDialog";
import { selectVehicleReservations } from "../../store/user/selectors";
import { cancelVehicleReservation } from "../../store/vehicle/actions";
import { fetchUserVehiclesReservation } from "../../store/user/actions";

export default function VehiclesReservation() {
  const role = window.localStorage.getItem("role");
  const classes = useStyles();
  const dispatch = useDispatch();
  const reservations = useSelector(selectVehicleReservations);
  const [selectedReservation, setSelectedReservation] = useState(false);

  const [racRatinModalVisibility, setRacRatingModalVisibility] = useState(false);
  const [vehicleRatingModalVisibility, setVehicleRatingModalVisibility] = useState(false);
  const [cancelReservationDialogVisibility, setCancelReservationDialogVisibility] = useState(false);
  const [successModalVisibility, setSuccessModalVisibility] = useState(false);
  const [successModalContent, setSuccessModalContent] = useState("");


  useEffect(() => {
    if (role === "USER")
      dispatch(fetchUserVehiclesReservation())
  }, [])

  function handleCancel() {
    dispatch(cancelVehicleReservation({
      reservationId: selectedReservation.reservationId,
      callback: () => {
        setSuccessModalContent("You have been successfully canceled reservation!")
        setSuccessModalVisibility(true)
        setTimeout(() => {
          setCancelReservationDialogVisibility(false)
        }, 2000)
      }
    }));
  }

  function handleRatingSuccess(name) {
    setSuccessModalContent(`Your rate for ${name} has been sent!`)
    setSuccessModalVisibility(true);
    setRacRatingModalVisibility(false);
    dispatch(fetchUserVehiclesReservation());
  }

  function closeModal() {
    setRacRatingModalVisibility(false);
    setVehicleRatingModalVisibility(false);
    setSuccessModalVisibility(false);
    setCancelReservationDialogVisibility(false);
  }

  const actions = [
    {
      icon: "cancel",
      tooltip: "Cancel reservation",
      onClick: (event, rowData) => {
        setSelectedReservation(rowData)
        setCancelReservationDialogVisibility(true)
      }
    },
    {
      icon: "commute",
      tooltip: "Rate rent a car",
      onClick: (event, rowData) => {
        setSelectedReservation(rowData)
        setRacRatingModalVisibility(true);
      }
    },
    {
      icon: "motorcycle",
      tooltip: "Rate vehicle",
      onClick: (event, rowData) => {
        setSelectedReservation(rowData)
        setVehicleRatingModalVisibility(true);
      }
    }
  ];

  const columns = [
    { title: "Vehicle", field: "vehicle" },
    { title: "Rent a car", field: "rentACar" },
    { title: "From date", field: "pickUpDate" },
    { title: "Till date", field: "dropOffDate" },
    { title: "Price", field: "price" },
    { title: "Vehicle rating", field: "vehicleRating" },
    { title: "Rent a car rating", field: "rentACarRating" }

  ];

  return (
    <div>
      {role === 'USER' ?
        <div>
          <SuccessInformation
            title={`Success`}
            content={`${successModalContent}`}
            closeModal={closeModal}
            isVisible={successModalVisibility}
            handleClose={() => closeModal()} />
          <ConfirmationDialog
            isVisible={cancelReservationDialogVisibility}
            title={`Are you sure you want to cancel this reservation?`}
            handleClose={() => closeModal()}
            callYesAction={handleCancel}
          />
          <Modal open={racRatinModalVisibility} onClose={closeModal} className={classes.modal}>
            <RentACarRating
              reservation={selectedReservation}
              handleClose={() => handleRatingSuccess(selectedReservation.rentACar)} />
          </Modal>
          <Modal open={vehicleRatingModalVisibility} onClose={closeModal} className={classes.modal}>
            <VehicleRating
              reservation={selectedReservation}
              handleClose={() => handleRatingSuccess(selectedReservation.vehicle)} />
          </Modal>
          <MaterialTable
            className={classes.table}
            title="Reservation history"
            columns={columns}
            data={reservations}
            actions={actions}
            style={{
              color: '#1A1B1C',
              background: "#CEA027",
            }}
            options={{
              headerStyle: {
                color: '#1A1B1C',
                background: "#CEA027",
              },
              searchFieldStyle: {
                color: '#1A1B1C',
                background: "#CEA027"
              },
              filterCellStyle: {
                color: '#1A1B1C',
                background: "#CEA027",
              },
              actionsCellStyle: {
                color: '#1A1B1C',
                background: "#CEA027",
              },
              rowStyle: {
                color: "#1A1B1C",
                background: "#CEA027",
              },
              toolbar: {
                color: '#1A1B1C',
                background: "#CEA027",
              }
            }}
          />
        </div>
        : null}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  modal: {
    overflowY: "auto",
    overFlowX: "auto"
  },
  table: {
    background: "#1A1B1C",
    color: "#CEA027"
  }
}));


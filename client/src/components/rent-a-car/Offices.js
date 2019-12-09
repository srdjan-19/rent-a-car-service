import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Modal from "@material-ui/core/Modal";
import RentACarOffice from "./Office";
import CreateOffice from "./CreateOffice";
import Background from "../../assets/background.jpg";
import { selectRentACarOffices } from "../../store/rent-a-car/selectors";
import { fetchRentACarOffices } from "../../store/rent-a-car/actions";

export default function RentACarOffices({ rentACarId, closeModal }) {
  const role = window.localStorage.getItem("role");
  const classes = useStyles();
  const dispatch = useDispatch();

  const offices = useSelector(selectRentACarOffices);
  const [createModalVisibility, setCreateModalVisibility] = useState(false);


  useEffect(() => {
    dispatch(
      fetchRentACarOffices({
        rentACarId
      })
    );
  }, [dispatch, rentACarId]);

  function handleClose() {
    setCreateModalVisibility(false);
  }

  return (
    <div className={classes.offices}>
      <Modal open={createModalVisibility} onClose={handleClose}>
        <CreateOffice rentACarId={rentACarId} closeModal={handleClose} />
      </Modal>
      <Container className={classes.horizontal} maxWidth="xl">
        <Typography className={classes.header} >Offices</Typography>
        {role === "RENT_A_CAR_ADMIN" ? (
          <Icon onClick={() => setCreateModalVisibility(true)} className={classes.btnCreate}>
            add_circle
          </Icon>
        ) : null}
      </Container>
      <Container maxWidth="xl" className={classes.horizontal}>
        {Object.keys(offices).map(index => (
          <RentACarOffice key={offices[index].id} office={offices[index]} />
        ))}
      </Container>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  header: {
    color: "#1A1B1C",
    fontFamiliy: "Roboto",
    textTransform: "uppercase",
    fontSize: 24
  },
  offices: {
    marginBottom: 25,
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: `url(${Background})`,
    marginTop: 15,
    width: "100%"
  },
  btnCreate: {
    color: "#CEA027",
    '&:hover': {
      color: "#1A1B1C",
    }
  },
}));

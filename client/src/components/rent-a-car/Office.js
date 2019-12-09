import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { Container, Tooltip } from "@material-ui/core";
import ConfirmationDialog from "../UI/ConfirmationDialog";

import { deleteRentACarOffice } from "../../store/rent-a-car/actions";
export default function RentACarOffice({ office }) {
  const role = window.localStorage.getItem("role");
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isDialogForDeleteVisible, setDialogVisibility] = useState(false);

  function handleDeleteOffice() {
    dispatch(deleteRentACarOffice(
      {
        id: office.id
      }
    ));
    setDialogVisibility(false);
  }

  return (
    <div className={classes.horizontal}>
      <Container className={classes.office} maxWidth="xs">
        {role === "RENT_A_CAR_ADMIN" ? (
          <Tooltip title={`Remove office in ${office.location}`} >
            <DeleteIcon
              fontSize="small"
              className={classes.btnRemove}
              aria-label="delete"
              onClick={() => {
                setDialogVisibility(true);
              }}
            />
          </Tooltip>
        ) : null}
        <Typography className={classes.location} color="textSecondary">
          {office.location}
        </Typography>
      </Container>
      <ConfirmationDialog
        isVisible={isDialogForDeleteVisible}
        title={`Are you sure you want to remove office in '${office.location}' ?`}
        handleClose={() => {
          setDialogVisibility(false);
        }}
        callYesAction={handleDeleteOffice}
      />
    </div >
  );
}

const useStyles = makeStyles(theme => ({
  horizontal: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  office: {
    width: 400,
    display: "flex",
    flexDirection: "row",
  },
  location: {
    marginTop: 15,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: "#CEA027"
  },
  btnRemove: {
    marginTop: 15,
    marginRight: 5,
    color: "#1A1B1C",
    '&:hover': {
      color: 'red'
    }
  }
}));

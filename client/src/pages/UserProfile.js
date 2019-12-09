import React, { useEffect, useState } from "react";
import { Container, Grid, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import LockOpenSharpIcon from '@material-ui/icons/LockOpenSharp';
import Background from "../assets/polygon.jpg";
import VehilceReservationHistory from "../components/vehicle/VehiclesReservationHistory"
import Friends from "../components/user/Friends"
import UpdateUserProfile from "../components/user/ProfileUpdate";
import UpdateUserPassword from "../components/user/PasswordUpdate";
import { userDataSelector, selectUserFriends } from "../store/user/selectors";
import { fetchUserData, fetchUserFriends } from "../store/user/actions";


export default function UserProfile({ userID }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userId = window.localStorage.getItem("userID");
  const user = useSelector(userDataSelector);
  const friends = useSelector(selectUserFriends);

  const [updateProfileModalVisibility, setUpdateProfileModalVisibility] = useState(false)
  const [updatePasswordModalVisibility, setUpdatePasswordModalVisibility] = useState(false)
  const [friendsModalVisibility, setFriendsModalVisibility] = useState(false)

  useEffect(() => {
    dispatch(fetchUserData(userId));
    dispatch(fetchUserFriends());
  }, []);

  function handleClose() {
    setUpdateProfileModalVisibility(false);
    setUpdatePasswordModalVisibility(false);
    setFriendsModalVisibility(false);
  }

  function handleUpdateProfile() {
    setUpdateProfileModalVisibility(true);
  }

  function handleUpdatePassword() {
    setUpdatePasswordModalVisibility(true);
  }

  function handleShowFriends() {
    setFriendsModalVisibility(true);
  }

  return (
    <Container maxWidth="xl" className={classes.verticalWithBckg}>
      <Modal open={friendsModalVisibility} onClose={handleClose}>
        <Friends />
      </Modal>
      <Modal open={updateProfileModalVisibility} onClose={handleClose}>
        <UpdateUserProfile />
      </Modal>
      <Modal open={updatePasswordModalVisibility} onClose={handleClose}>
        <UpdateUserPassword />
      </Modal>
      <Grid item xs={6} className={classes.horizontal}>
        <Avatar className={classes.avatar} src={require("../assets/profile_128x128.png")}></Avatar>
        <Grid item xs={6} className={classes.vertical}>
          <Grid className={classes.horizontalBtns}>
            <Tooltip title={`Update your profile`} placement="top">
              <Button className={classes.button} onClick={handleUpdateProfile}>
                <UpdateSharpIcon></UpdateSharpIcon>
              </Button>
            </Tooltip>
            <Tooltip title={`Update your password`} placement="top">
              <Button className={classes.button} onClick={handleUpdatePassword}>
                <LockOpenSharpIcon></LockOpenSharpIcon>
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} >
            <Button className={classes.friends} onClick={handleShowFriends}>
              {friends.length} friends
            </Button>
          </Grid >
          <Grid className={classes.horizontalInfo}>
            <Typography component="h1" className={classes.label} color="initial">
              {user.firstName}
            </Typography>
            <Typography component="h1" className={classes.label} color="initial">
              {user.lastName}
            </Typography>
            <Typography component="h1" className={classes.label} color="textSecondary" >
              ({user.email})
            </Typography>
          </Grid>
          <Typography component="h1" className={classes.address} color="textSecondary" >
            {user.city}, {user.state}
          </Typography>
        </Grid >
      </Grid >
      <Container maxWidth="xl">
        <VehilceReservationHistory />
      </Container>

    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  vertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "6%",
  },
  verticalWithBckg: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    paddingBottom: "30%"

  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 25,
    marginBottom: 25
  },
  horizontalInfo: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto"
  },
  horizontalBtns: {
    display: "flex",
    flexDirection: "row",
  },
  label: {
    marginLeft: 5,
    fontFamily: "Roboto"
  },
  address: {
    marginLeft: 5,
    marginRight: "auto",
  },
  avatar: {
    width: 128,
    height: 128,
    marginRight: 25
  },
  button: {
    background: "#1A1B1C",
    marginBottom: 15,
    marginLeft: 25,
    marginRight: "auto",
    marginTop: 15,
    height: 35,
    color: "#CEA027"
  },
  friends: {
    marginRight: "auto",
    '$:hover': {
      background: 'transparent'
    }
  }
}));

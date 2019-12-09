import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import GroupIcon from "@material-ui/icons/Group";
import DriveEtaSharpIcon from '@material-ui/icons/DriveEtaSharp';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PersonAddSharpIcon from "@material-ui/icons/PersonAddSharp";
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import InputRoundedIcon from "@material-ui/icons/InputRounded";
import RegistrationPage from "../pages/Registration";
import FriendshipRequests from "../components/user/FriendshipRequest";
import LoginPage from "../pages/Login";
import Tooltip from "@material-ui/core/Tooltip";
import Container from "@material-ui/core/Container";
import { history } from "../index";
import { userTokenSelector } from "../store/user/selectors";
import { logoutUser } from "../store/user/actions";

export default function Navbar() {
  const classes = useStyles();
  const userToken = useSelector(userTokenSelector);
  const dispatch = useDispatch();

  const userId = window.localStorage.getItem("userID");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [
    registrationModalVisibility,
    setRegistrationModalVisibility
  ] = useState(false);

  const [loginModalVisibility, setLoginModalVisibility] = useState(false);

  const handleLogout = () => {
    dispatch(
      logoutUser({
        callback: () => {
          history.push("/");
        }
      })
    );
  };

  function closeModal() {
    setRegistrationModalVisibility(false);
    setLoginModalVisibility(false);
  }

  const handlePopover = event => {
    if (anchorEl != null)
      setAnchorEl(null);
    else
      setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <Modal open={registrationModalVisibility} onClose={closeModal} className={classes.modal}>
        <RegistrationPage closeModal={closeModal} />
      </Modal>
      <Modal open={loginModalVisibility} onClose={closeModal} className={classes.modal}>
        <LoginPage closeModal={closeModal} />
      </Modal>
      <AppBar
        position="static"
        color="primary"
        className={classes.navbar}
      >
        <Toolbar>
          <LightTooltip title="Home">
            <Link className="button" to="" edge="start">
              <img src={require("../assets/umslogo.png")} height="48" alt={"logo"}></img>
            </Link>
          </LightTooltip>
          <LightTooltip title="Check our offer">
            <Link to={`/rent-a-cars`}>
              <Button className={classes.btn}>
                <DriveEtaSharpIcon></DriveEtaSharpIcon>
              </Button>
            </Link>
          </LightTooltip>
          {userToken != null ? (
            <Container className={classes.items}>
              <LightTooltip title="Logout">
                <Button className={classes.btn} onClick={handleLogout}>
                  <ExitToAppSharpIcon></ExitToAppSharpIcon  >
                </Button>
              </LightTooltip>
              <LightTooltip title="Profile">
                <Link className="button" to={`/user/${userId}`}>
                  <Button className={classes.btn}>
                    <AccountBoxIcon></AccountBoxIcon>
                  </Button>
                </Link>
              </LightTooltip>
              <LightTooltip title="Friend requests">
                <PopupState variant="popover" popupId="popup-popover" fullWidth={true} className={classes.modal}>
                  {popupState => (
                    <div>
                      <Button className={classes.btn} onClick={handlePopover}  {...bindTrigger(popupState)}>
                        <GroupIcon></GroupIcon>
                      </Button>
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <FriendshipRequests />
                      </Popover>
                    </div>
                  )}
                </PopupState>
              </LightTooltip>
            </Container>
          ) : (
              <Container className={classes.items}>
                <LightTooltip title="Create account">
                  <Button
                    className={classes.btn}
                    onClick={() => setRegistrationModalVisibility(true)}
                  >
                    <PersonAddSharpIcon></PersonAddSharpIcon>
                  </Button>
                </LightTooltip>
                <LightTooltip title="Login">
                  <Button
                    className={classes.btn}
                    onClick={() => setLoginModalVisibility(true)}
                  >
                    <InputRoundedIcon></InputRoundedIcon>
                  </Button>
                </LightTooltip>
              </Container>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  modal: {
    overflowX: "auto",
    overflowY: "auto"
  },
  items: {
    direction: "rtl",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

  },
  root: {
    flexGrow: 1
  },
  btn: {
    color: "#CEA027"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  navbar: {
    background: "#01040B"
  },
  paper: {
    width: 550,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #CEA027",
    boxShadow: theme.shadows[5],
  },
  popover: {
    pointerEvents: 'none',
  }
}));

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

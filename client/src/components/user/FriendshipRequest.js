import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import FindFriends from "./FindFriends";
import { updateFriendshipRequest, fetchFriendshipRequests, fetchUserFriends } from "../../store/user/actions";
import { selectFriendshipRequests } from "../../store/user/selectors";

export default function FriendshipRequest({ friendship }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const friendshipRequests = useSelector(selectFriendshipRequests);

  const [findFriendsModalVisibility, setFindFriendsModalVisibility] = useState(false);

  useEffect(() => {
    dispatch(fetchFriendshipRequests())
  }, [])

  function handleAccept(id) {
    dispatch(updateFriendshipRequest(
      {
        friendshipId: id,
        status: "ACCEPTED",
        callback: () => {
          dispatch(fetchUserFriends())
          dispatch(fetchFriendshipRequests())
        }
      }
    ))
  }

  function handleDecline(id) {
    dispatch(updateFriendshipRequest(
      {
        friendshipId: id,
        status: "DECLINED",
      }
    ))
  }

  function handleClose() {
    setFindFriendsModalVisibility(false);
  }

  return (
    <div className={classes.paper}>
      <Modal open={findFriendsModalVisibility} onClose={handleClose} className={classes.modal}>
        <FindFriends />
      </Modal>
      <Container className={classes.vertical} maxWidth="xl">
        {friendshipRequests.length > 0 ?
          <div>
            <Typography className={classes.header}>
              FRIENDSHIP REQUESTS
            </Typography>
            {Object.keys(friendshipRequests).map(index => (
              <Container maxWidth="xl" className={classes.horizontal} key={friendshipRequests[index].id}>
                <Typography className={classes.requestInfo}>
                  <strong>{friendshipRequests[index].firstName} {" "} {friendshipRequests[index].lastName}</strong> has sent you a request for friendship.
              </Typography>
                <Button className={classes.btn} onClick={() => handleAccept(friendshipRequests[index].friendshipId)}>
                  <CheckCircleOutlineSharpIcon />
                </Button>
                <Button className={classes.btn} onClick={() => handleDecline(friendshipRequests[index].friendshipId)}>
                  <HighlightOffSharpIcon />
                </Button>
              </Container>
            ))}
          </div>
          :
          <Typography className={classes.typo}>
            You dont have any friendship requests.
          </Typography>}
        <Button className={classes.btnNewFriends} onClick={() => setFindFriendsModalVisibility(true)}>
          CLICK HERE TO FIND NEW FRIENDS
          </Button>
      </Container>

    </div>
  );
}

const useStyles = makeStyles({
  modal: {
    overflowX: "auto",
    overflowY: "auto"
  },
  paper: {
    backgroundColor: "#fafafa",
    border: "2px solid #CEA33F",
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 25,
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    border: "1px dotted #CEA027"
  },
  typo: {
    marginTop: 25,
    marginBottom: 10,
    paddingBottom: 25,
    color: "#CEA027",
    fontFamily: "Roboto",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    border: "1px dotted #CEA027"
  },
  requestInfo: {
    marginTop: 5
  },
  header: {
    marginTop: 15,
    paddingBottom: 15,
    fontSize: 24,
    color: "#CEA027",
    fontFamily: "Roboto",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    border: "1px dotted #CEA027"
  },
  btn: {
    marginLeft: 5,
    marginBottom: 15,
    color: "#01040B",
    '&:hover': {
      color: "#CEA027",
      background: "#FFFFFF"
    }
  },
  btnNewFriends: {
    marginLeft: 5,
    color: "#01040B",
    '&:hover': {
      color: "#CEA027",
      background: "#fafafa"
    }
  }
});

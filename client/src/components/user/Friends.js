import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from "@material-ui/core/Button";
import SuccessInformation from "../UI/SuccessInformationModal";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import { selectUserFriends } from "../../store/user/selectors";
import { fetchUserFriends, removeFriend } from "../../store/user/actions";

export default function Friends({ isVisible, handleClose = () => { } }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const friends = useSelector(selectUserFriends);
  const [succcessModalVisibility, setSuccessModalVisibility] = useState(false);
  const [succcessModalContent, setSuccessModalContent] = useState("");

  useEffect(() => {
    dispatch(fetchUserFriends());
  }, []);

  function handleRemove(friend) {
    dispatch(removeFriend({
      friendshipId: friend.id,
      callback: () => {
        setSuccessModalContent(`You are not friend with ${friend.firstName} ${friend.lastName} anymore.`)
        setSuccessModalVisibility(true);
      }
    }));
  }

  function closeModal() {
    setSuccessModalVisibility(false);
  }

  return (
    <Container maxWidth="xs" className={classes.vertical}>
      <SuccessInformation
        title={`Success`}
        content={succcessModalContent}
        isVisible={succcessModalVisibility}
        handleClose={() => closeModal()}
      />
      {friends.length > 0 ?
        <List >
          {Object.keys(friends).map(index => (
            <Container maxWidth="xl" className={classes.horizontal}>
              <ListItem key={friends[index].id} className={classes.item} >
                <ListItemText
                  primary={`${friends[index].firstName} ${friends[index].lastName} `}
                  secondary={`${friends[index].email}`}
                />
                <Button onClick={() => handleRemove(friends[index])} className={classes.btnRemove} >
                  <HighlightOffSharpIcon></HighlightOffSharpIcon>
                </Button>
              </ListItem>
            </Container>
          ))}
        </List> :
        <Typography className={classes.message}>
          You dont have any friends. :(
        </Typography>}
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  vertical: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    background: "#fafafa",
    border: "2px solid #CEA33F",
    boxShadow: theme.shadows[7],
    width: 400,
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  btnRemove: {
    '&:hover': {
      background: "#fafafa",
      color: "#CEA027"
    }
  },
  item: {
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    border: "1px dotted #CEA027",
    marginBottom: 15
  },
  message: {
    textAlign: "center",
    marginTop: 25,
    marginBottom: 25,
    color: "#CEA027"
  },
}));

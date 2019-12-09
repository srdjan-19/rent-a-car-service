import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import SuccessInformation from "../UI/SuccessInformationModal";
import ArrowUpwardSharpIcon from '@material-ui/icons/ArrowUpwardSharp';
import { selectUsers } from "../../store/user/selectors";
import { fetchUsers, sendFriendshipRequest } from "../../store/user/actions";

export default function FindFriends({ isVisible, handleClose = () => { } }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const users = useSelector(selectUsers);
    const loggedUserId = window.localStorage.getItem("userID");

    const [succcessModalVisibility, setSuccessModalVisibility] = useState(false);
    const [succcessModalContent, setSuccessModalContent] = useState("");

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    function handleSendRequest(friend) {
        dispatch(sendFriendshipRequest({
            friendId: friend.id,
            callback: () => {
                setSuccessModalContent(`You have been successfully sent an friend request to ${friend.firstName} ${friend.lastName}.`)
                setSuccessModalVisibility(true);
            }
        }));
    }

    return (
        <Container maxWidth="xs" className={classes.vertical}>
            <SuccessInformation
                title={`Success`}
                content={succcessModalContent}
                isVisible={succcessModalVisibility}
                handleClose={() => setSuccessModalVisibility(false)}
            />
            {users.length > 0 ?
                <List >
                    {Object.keys(users).map(index => (
                        <Container key={users[index].id} maxWidth="xl" className={classes.horizontal}>
                            <ListItem className={classes.item} >
                                <ListItemText
                                    primary={`${users[index].firstName} ${users[index].lastName} `}
                                    secondary={`${users[index].email}`}
                                />
                                {loggedUserId !== users[index].id ?
                                    <Button onClick={() => handleSendRequest(users[index])} className={classes.btnSendRequest} >
                                        <ArrowUpwardSharpIcon />
                                    </Button>
                                    : null}
                            </ListItem>
                        </Container>
                    ))}
                </List> :
                <Typography className={classes.typo}>
                    There is no registred users, yet. :(
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
        width: 400
    },
    horizontal: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    btnSendRequest: {
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
        marginBottom: 10
    },
    typo: {
        textAlign: "center",
        marginTop: 25,
        marginBottom: 25,
        color: "#CEA027"
    },
}));

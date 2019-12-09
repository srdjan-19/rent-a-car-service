import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import Rating from "react-rating";
import Modal from "@material-ui/core/Modal";
import dateFormat from "dateformat";
import EditRentACar from "../rent-a-car/EditRentACar";
import ConfirmationDialog from "../UI/ConfirmationDialog";
import RentACarIncome from "./Income";
import RentACarBusyness from "./Busyness";
import RentACarAvailability from "./Availability";
import vehicle from "../../assets/vehicle.png";
import ISAMap from "../UI/ISAMap";
import {
    selectRentACarDetails,
    selectOffices
} from "../../store/rent-a-car/selectors";
import {
    deleteRentACar,
    fetchRentACarDetails,
    fetchRentACarLocationInformation
} from "../../store/rent-a-car/actions";
import { putError } from "../../store/common/actions";

export default function RentACar({ rentACar, location, history }) {
    const role = window.localStorage.getItem("role");
    const classes = useStyles();
    const dispatch = useDispatch();

    const selected = useSelector(selectRentACarDetails);
    const offices = useSelector(selectOffices);

    const [pickUpDate, setPickUpDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
    const [dropOffDate, setDropOffDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));

    const [updateModalVisibility, setUpdateModalVisibility] = useState(false);
    const [deleteDialogVisibility, setDeleteDialogVisibility] = useState(false);
    const [showIncomeModalVisibility, setShowIncomeModalVisibility] = useState(false);
    const [showBusynessModalVisibility, setShowBusynessModalVisibility] = useState(false);
    const [showAvailabilityModalVisibility, setShowAvailabilityModalVisibility] = useState(false);

    useEffect(() => {
        if (location.state !== undefined) {
            setPickUpDate(location.state.pickUpDate);
            setDropOffDate(location.state.dropOffDate);
        }
    }, []);

    function handleUpdate() {
        if (selected.name === undefined) dispatch(putError("Please select rent a car first"));
        else setUpdateModalVisibility(true);
    }

    function handleShowIncome(val, index) {
        if (selected.name === undefined) dispatch(putError("Please select rent a car first"));
        else setShowIncomeModalVisibility(true);
    }

    function handleShowBusyness() {
        if (selected.name === undefined) dispatch(putError("Please select rent a car first"));
        else setShowBusynessModalVisibility(true);
    }

    function handleShowAvailability() {
        if (selected.name === undefined) dispatch(putError("Please select rent a car first"));
        else setShowAvailabilityModalVisibility(true);
    }

    function handleRemove() {
        dispatch(deleteRentACar(
            {
                id: selected.id,
                callback: () => {
                    setDeleteDialogVisibility(false)
                }
            }
        ));
    }

    function handleHover() {
        dispatch(fetchRentACarDetails(rentACar.id));
    }

    function closeModal() {
        setUpdateModalVisibility(false);
        setShowIncomeModalVisibility(false);
        setShowBusynessModalVisibility(false);
        setShowAvailabilityModalVisibility(false);
        setDeleteDialogVisibility(false);
    }


    return (
        <Container className={classes.horizontal}>
            <Modal open={updateModalVisibility} onClose={closeModal} className={classes.modal}>
                <EditRentACar closeModal={closeModal} />
            </Modal>
            <Modal open={showIncomeModalVisibility} onClose={closeModal} className={classes.modal}>
                <RentACarIncome closeModal={closeModal} />
            </Modal>
            <Modal open={showBusynessModalVisibility} onClose={closeModal} className={classes.modal}>
                <RentACarBusyness closeModal={closeModal} />
            </Modal>
            <Modal open={showAvailabilityModalVisibility} onClose={closeModal} className={classes.modal}>
                <RentACarAvailability closeModal={closeModal} />
            </Modal>
            <ConfirmationDialog
                isVisible={deleteDialogVisibility}
                title={`Are you sure you want to delete rent a car '${selected.name}' ?`}
                handleClose={() => closeModal()}
                callYesAction={handleRemove}
            />
            <Card
                className={classes.card}
                // key={rentACar.id}
                onMouseEnter={() => {
                    handleHover();
                }}
            >
                <CardHeader title={rentACar.name}
                    action={
                        role === "RENT_A_CAR_ADMIN" ? (
                            <Button
                                className={classes.btnRemove}
                                onClick={() => setDeleteDialogVisibility(true)}>
                                <DeleteForeverIcon></DeleteForeverIcon>
                            </Button>
                        )
                            : null
                    }
                >
                </CardHeader>
                <CardMedia
                    className={classes.media}
                    image={vehicle}
                    onMouseEnter={() => {
                        handleHover();
                    }}
                    onClick={() => {
                        dispatch(fetchRentACarLocationInformation(rentACar.address));
                        history.push({
                            pathname: `/rent-a-cars/${rentACar.id}/`,
                            state: {
                                pickUpDate: pickUpDate,
                                dropOffDate: dropOffDate
                            }
                        });
                    }}
                />
                <CardContent className={classes.content}>
                    <Typography className={classes.description}>
                        {rentACar.description}
                    </Typography>
                    {offices.map((office, index) => (
                        <Container key={office.id} className={classes.offices}>
                            {office.name === rentACar.name ? (
                                <Typography>{office.location}</Typography>
                            ) : null}
                        </Container>
                    ))}
                    <br />
                    <Typography>
                        <Rating
                            readonly={true}
                            className={classes.rating}
                            initialRating={rentACar.rating}
                            stop={10}
                            fractions={100}
                            emptySymbol={<StarBorderIcon></StarBorderIcon>}
                            fullSymbol={<StarIcon></StarIcon>}
                        ></Rating>
                    </Typography>
                </CardContent>
                {role === "RENT_A_CAR_ADMIN" ? (
                    <CardActions>
                        <Container className={classes.btnGroupBckg} maxWidth="xl">
                            <ButtonGroup
                                size="small"
                                fullWidth
                                className={classes.btnGroupVertical}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.btnUpdate}
                                    onClick={handleUpdate}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.btnGroup}
                                    onClick={handleShowIncome}
                                >
                                    Income
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.btnGroup}
                                    onClick={handleShowBusyness}
                                >
                                    Busyness
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.btnGroup}
                                    onClick={handleShowAvailability}
                                >
                                    Availability
                                </Button>
                            </ButtonGroup>
                        </Container>
                    </CardActions>
                ) : null}
            </Card>
            <ISAMap
                address={rentACar.address}
                hasClick={false}
                width={700}
                height={"80%"}
            />
        </Container >
    );

}

const useStyles = makeStyles(theme => ({
    modal: {
        overflowY: "auto",
        overFlowX: "auto"
    },
    horizontal: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        paddingBottom: 20,
        marginTop: 25,
    },
    card: {
        backgroundColor: "#F0E8C6",
        color: "#1A1B1C",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 1),
        width: 300
    },
    btnRemove: {
        background: "#F0E8C6",
        color: "#CEA027",
        '&:hover': {
            background: "#F0E8C6",
            color: "red",
        }
    },
    media: {
        height: 128,
        backgroundSize: 'contain'
    },
    content: {
        textAlign: 'center'
    },
    description: {
        marginBottom: 25
    },
    offices: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        maxHeight: 50,
    },
    rating: {
        color: "#CEA027"
    },
    btnGroupBckg: {
        marginBottom: 25,
    },
    btnGroupVertical: {
        display: "flex",
        flexDirection: "column",
    },
    btnUpdate: {
        background: "#1A1B1C",
        color: "#CEA027",
        marginBottom: 20,
        border: '1px solid #CEA027',
        '&:hover': {
            background: "#CEA027",
            color: "#1A1B1C",
        }
    },
    btnGroup: {
        background: "#1A1B1C",
        color: "#CEA027",
        '&:hover': {
            background: "#CEA027",
            color: "#1A1B1C",
        }
    }
}))
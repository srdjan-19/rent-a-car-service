import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import { Tooltip, Button, Container } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import Rating from "react-rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import CardBackground from "../../assets/card_discount_bckg.jpg";
import SuccessInformation from "../UI/SuccessInformationModal";
import { createQuickVehicleReservation } from "../../store/vehicle/actions";

export default function RentACarDiscountedVehicle({ discountedVehicle, handleClose = () => { } }) {
    const role = window.localStorage.getItem("role");
    const classes = useStyles();
    const dispatch = useDispatch();

    const [successModalVisibility, setSuccessModalVisibility] = useState(false);

    function handleReserve(discountedVehicle) {
        dispatch(createQuickVehicleReservation(
            {
                discountId: discountedVehicle.discountId,
                price: discountedVehicle.discounted,
                callback: () => {
                    setSuccessModalVisibility(true)
                }
            }
        ));
    }

    return (
        <Card className={classes.card}>
            <SuccessInformation
                title={`Success`}
                content={`You reserverd ${discountedVehicle.brand} ${discountedVehicle.model} `}
                isVisible={successModalVisibility}
                handleClose={() => {
                    setSuccessModalVisibility(false);
                }}
            />
            <CardContent>
                <Typography className={classes.title} variant="h5" component="h2">
                    {discountedVehicle.brand} {discountedVehicle.model}
                </Typography>
                <Typography color="textSecondary">{discountedVehicle.type}</Typography>
                <br />
                <Typography variant="body2">
                    Manufactured: <strong>{discountedVehicle.yearOfProduction}.</strong>
                    <div>
                        <br /> Price: <strong>{discountedVehicle.originalPrice}$</strong>.
                        <br /> Discounted: <strong>{discountedVehicle.discounted}$</strong>.
                    </div>
                    <br />
                    <Rating
                        readonly={true}
                        className={classes.rating}
                        initialRating={discountedVehicle.numberOfSeats}
                        stop={discountedVehicle.numberOfSeats}
                        fullSymbol={<AccessibilityIcon></AccessibilityIcon>}
                        emptySymbol={<AccessibilityIcon></AccessibilityIcon>}>
                    </Rating>
                    <br />
                    <Rating
                        readonly={true}
                        className={classes.rating}
                        initialRating={discountedVehicle.rating}
                        stop={10}
                        emptySymbol={<StarBorderIcon></StarBorderIcon>}
                        fullSymbol={<StarIcon></StarIcon>}>
                    </Rating>
                    <div className={classes.content}>
                        <strong>
                            {discountedVehicle.pickUpDate} |{" "}
                            {discountedVehicle.dropOffDate}{" "}
                        </strong>
                    </div>
                </Typography>
                <br />
                {role === "USER" ? (
                    <Container>
                        <Typography variant="body2" component="p">
                            COMPLETE QUICK RESERVATION
                    </Typography>
                        <ArrowDropDownSharpIcon fontSize="large" />
                        <ArrowDropDownSharpIcon fontSize="large" />
                        <ArrowDropDownSharpIcon fontSize="large" />
                        <ArrowDropDownSharpIcon fontSize="large" />
                        <ArrowDropDownSharpIcon fontSize="large" />
                    </Container>
                ) : null}
            </CardContent>
            <CardActions>
                {role === "USER" ? (
                    <Tooltip title="Reserve">
                        <Button onClick={() => handleReserve(discountedVehicle)} className={classes.btn}>
                            RESERVE
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
        padding: 15,
        paddingBottom: 25,
        backgroundImage: `url(${CardBackground})`,
        textAlign: "center",
        backgroundSize: "cover",
        marginLeft: "auto",
        marginRight: "auto"
    },
    title: {
        textAlign: "center",
        color: "#1A1B1C",
        fontFamily: "Corbel",
        marginTop: 25,
        marginBottom: 15
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

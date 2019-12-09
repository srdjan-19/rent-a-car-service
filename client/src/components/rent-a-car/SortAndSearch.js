import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Container } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider, } from "@material-ui/pickers";
import dateFormat from "dateformat";
import CreateRentACar from "./CreateRentACar";
import { searchRentACars, sortRentACars } from "../../store/rent-a-car/actions";
import { selectVehicleSearchCriteria } from "../../store/vehicle/selectors";
import { putError } from "../../store/common/actions";

export default function SortAndSearch() {
    const role = window.localStorage.getItem("role");
    const classes = useStyles();
    const dispatch = useDispatch();
    const criteria = useSelector(selectVehicleSearchCriteria);

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pickUpDate, setPickUpDate] = useState(criteria.pickUpDate);
    const [dropOffDate, setDropOffDate] = useState(criteria.dropOffDate);

    const [createModalVisibility, setCreateModalVisibility] = useState(false);

    function handleSearch() {
        if (pickUpDate > dropOffDate) {
            dispatch(putError("Pick up date must be before drop off date!"));
            return;
        }

        dispatch(
            searchRentACars({
                name,
                state,
                city,
                pickUpDate,
                dropOffDate
            })
        );
    }

    function handleSortByName() {
        dispatch(sortRentACars({ by: "name" }));
    }

    function handleSortByAddress() {
        dispatch(sortRentACars({ by: "address" }));
    }

    function handleSortByRating() {
        dispatch(sortRentACars({ by: "rating" }));
    }

    function closeModal() {
        setCreateModalVisibility(false);
    }

    return (
        <Container className={classes.vertical}>
            <Modal open={createModalVisibility} onClose={closeModal} className={classes.modal}>
                <CreateRentACar closeModal={closeModal} />
            </Modal>
            <Container id="search" className={classes.horizontal}>
                <TextFieldStyled
                    className={classes.textField}
                    id="custom-css-standard-input"
                    label="Name"
                    defaultValue={name}
                    margin="normal"
                    type="text"
                    onChange={({ currentTarget }) => setName(currentTarget.value)}
                />
                <TextFieldStyled
                    label="City"
                    defaultValue={city}
                    className={classes.textField}
                    margin="normal"
                    type="text"
                    onChange={({ currentTarget }) => setCity(currentTarget.value)}
                />
                <TextFieldStyled
                    label="State"
                    defaultValue={state}
                    className={classes.textField}
                    margin="normal"
                    type="text"
                    onChange={({ currentTarget }) => setState(currentTarget.value)}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePickerStyled
                        disableToolbar
                        className={classes.date}
                        minDate={new Date()}
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        label="Start date"
                        value={pickUpDate}
                        onChange={date => setPickUpDate(dateFormat(date, "yyyy-mm-dd"))}
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        error={pickUpDate === null}
                        helperText={pickUpDate === null ? "Please select pick up date." : ""}
                    />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePickerStyled
                        disableToolbar
                        className={classes.date}
                        minDate={!!pickUpDate ? pickUpDate : new Date()}
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        label="End date"
                        value={dropOffDate}
                        onChange={date => setDropOffDate(dateFormat(date, "yyyy-mm-dd"))}
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        error={dropOffDate === ""}
                        helperText={dropOffDate === "" ? "Please select drop off date." : ""}
                    />
                </MuiPickersUtilsProvider>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Container>
            <Container className={classes.containerSort}>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button
                        className={classes.btnSort}
                        disabled
                    >
                        SORT BY
                    </Button>
                    <Button
                        className={classes.btnSortByAttr}
                        onClick={handleSortByName}
                    >
                        NAME
                    </Button>
                    <Button
                        className={classes.btnSortByAttr}
                        onClick={handleSortByAddress}
                    >
                        ADDRESS
                    </Button>
                    <Button
                        className={classes.btnSortByAttr}
                        onClick={handleSortByRating}
                    >
                        RATING
                    </Button>
                </ButtonGroup>
                {role === "RENT_A_CAR_ADMIN" ? (
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => setCreateModalVisibility(true)}
                    >
                        CREATE
                    </Button>
                ) : null}
            </Container>
        </Container>);
}

const useStyles = makeStyles(theme => ({
    vertical: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    horizontal: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingBottom: 20,
        marginTop: 25,
        borderBottom: "none",
        border: "4px solid #1A1B1C"
    },
    containerSort: {
        borderTop: "none",
        border: "4px solid #1A1B1C"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 180
    },
    date: {
        width: 180,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    button: {
        marginBottom: 25,
        marginLeft: 25,
        marginTop: 20,
        height: 35,
        background: "#1A1B1C",
        color: "#CEA027",
        '&:hover': {
            background: "#CEA027",
            color: "#1A1B1C",
        }
    },
    btnSortByAttr: {
        background: "#1A1B1C",
        color: "#CEA027",
        marginBottom: 20,
        border: '1px solid #CEA027',
        '&:hover': {
            background: "#CEA027",
            color: "#1A1B1C",
        }
    },
    btnSort: {
        marginBottom: 20,
        border: '1px solid #CEA027',
        '&:disabled': {
            color: "#1A1B1C",
            background: "#CEA027",

        },
    },

}));

const TextFieldStyled = withStyles({
    root: {
        '& label': {
            color: '#1A1B1C',
        },
        '& label.Mui-focused': {
            color: '#CEA027',
        },
        '& .MuiInputBase-input': {
            color: '#CEA027',
        },
        '& .MuiInput-input': {
            color: '#CEA027',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#1A1B1C',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#CEA027',
        }
    },
})(TextField);

const DatePickerStyled = withStyles({
    root: {
        '& label': {
            color: '#1A1B1C',
        },
        '& label.Mui-focused': {
            color: '#CEA027',
        },
        '& .MuiInputBase-input': {
            color: '#CEA027',
        },
        '& .MuiInputBase-inputAdornedEnd': {
            color: '#CEA027',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#1A1B1C',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#CEA027',
        },
        '& .MuiSvgIcon-root': {
            color: '#CEA027',
        },
        '& .MuiPickersDay-daySelected': {
            color: '#1A1B1C',
            backgroundColor: '#CEA027'
        }
    },
})(KeyboardDatePicker);

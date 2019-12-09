import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import MenuItem from '@material-ui/core/MenuItem';
import Container from "@material-ui/core/Container";
import { history } from "../index";
import { selectAddresses } from "../store/common/selectors";
import { fetchAddresses } from "../store/common/actions";
import { registerUser } from "../store/user/actions";

const RegistrationComponent = ({ closeModal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const addresses = useSelector(selectAddresses)

  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [password2nd, setPassword2nd] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const [address, setAddress] = useState();

  const [errorInputVisibility, setErrorInputVisibility] = useState(false);


  useEffect(() => {
    dispatch(fetchAddresses())
  }, [dispatch])

  const handleRegistration = () => {

    let errorCounter = 0;

    if (firstName == null) {
      setFirstName("")
      errorCounter++;
    }

    if (lastName == null) {
      setLastName("")
      errorCounter++;
    }

    if (email == null) {
      setEmail("")
      errorCounter++;
    }

    if (password == null) {
      setPassword("")
      errorCounter++;
    }

    if (password2nd == null) {
      setPassword2nd("")
      errorCounter++;
    }

    if (address == null) {
      setAddress("")
      errorCounter++;
    }

    if (phoneNumber == null) {
      setPhoneNumber("")
      errorCounter++;
    }

    if (errorCounter > 0)
      return;

    dispatch(
      registerUser({
        firstName,
        lastName,
        email,
        password,
        password2nd,
        phoneNumber,
        addressId: address,
        callback: () => {
          history.push("/login");
          closeModal();
        }
      })
    );
  };

  const handleChange = event => {
    setAddress(event.target.value)
  }

  return (
    <Container maxWidth="sm" className={classes.vertical}>
      <Avatar className={classes.avatar}>
        <AccountBoxSharpIcon />
      </Avatar>
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextFieldStyled
              id="first-name"
              autoComplete="fname"
              name="firstName"
              required
              fullWidth
              label="First Name"
              autoFocus
              className={classes.textField}
              onChange={({ currentTarget }) => {
                setFirstName(currentTarget.value);
                setErrorInputVisibility({ ...errorInputVisibility, firstName: true });
              }}
              error={firstName === ""}
              helperText={firstName === "" ? 'Please enter your firstname.' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldStyled
              id="last-name"
              required
              fullWidth
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              className={classes.textField}
              onChange={({ currentTarget }) => {
                setLastName(currentTarget.value);
              }}
              error={lastName === ""}
              helperText={lastName === "" ? 'Please enter your lastname.' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldStyled
              id="email"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              className={classes.textField}
              onChange={({ currentTarget }) => {
                setEmail(currentTarget.value);
              }}
              error={email === ""}
              helperText={email === "" ? 'Please enter your email.' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldStyled
              id="password"
              autoComplete="password"
              name="password"
              required
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              className={classes.textField}
              onChange={({ currentTarget }) => {
                setPassword(currentTarget.value);
              }}
              error={password === ""}
              helperText={password === "" ? 'Please enter your password.' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldStyled
              id="repeated-password"
              required
              fullWidth
              label="Repeat password"
              name="password2nd"
              autoComplete="password2nd"
              type="password"
              margin="normal"
              className={classes.textField}
              onChange={({ currentTarget }) => {
                setPassword2nd(currentTarget.value);
              }}
              error={password2nd === ""}
              helperText={password2nd === "" ? 'Please repeat your password.' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldStyled
              id="phone-number"
              required
              fullWidth
              name="phoneNumber"
              label="Phone number"
              type="phoneNumber"
              autoComplete="phoneNumber"
              className={classes.textField}
              onChange={({ currentTarget }) => {
                setPhoneNumber(currentTarget.value);
              }}
              error={phoneNumber === ""}
              helperText={phoneNumber === "" ? 'Please enter your phone number.' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldStyled
              id="select-address"
              required
              fullWidth
              select
              label="Addresses"
              value={address}
              onChange={handleChange}
              margin="normal"
              className={classes.textField}
              error={address === ""}
              helperText={address === "" ? 'Please select your address.' : 'Please fill all fields marked with  \'*\' '}
            >
              {addresses.map(address => (
                <MenuItem key={address.id} value={address.id} maxHeight={25}>
                  {address.street} {", "}{address.city} {", "}  {address.state}
                </MenuItem>
              ))}
            </TextFieldStyled>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          className={classes.btnSubmit}
          onClick={handleRegistration}
        >
          Sign Up
          </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2" className={classes.label}>
              Already have an account? Sign in
              </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  vertical: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#fafafa",
    border: "2px solid #CEA33F",
    boxShadow: theme.shadows[7],
    padding: theme.spacing(2, 4, 3)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#1A1B1C"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  btnSubmit: {
    marginTop: 25,
    marginBottom: 25,
    background: "#1A1B1C",
    color: "#CEA027",
    '&:hover': {
      background: "#CEA027",
      color: "#1A1B1C",
    }
  },
  label: {
    marginLeft: "auto",
    color: "#1A1B1C",
    fontFamiliy: "Roboto"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flex: 1
  }
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
      color: '#1A1B1C',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#1A1B1C',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#CEA027',
    }
  },
})(TextField);

export default RegistrationComponent;

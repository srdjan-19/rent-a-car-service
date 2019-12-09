import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { loginUser } from "../store/user/actions";

const LoginPage = ({ closeModal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleLogin() {
    dispatch(
      loginUser({
        email,
        password,
        callback: () => {
          closeModal()
        }
      })
    );
  }

  return (
    <Container maxWidth="xs" className={classes.vertical}>
      <Avatar className={classes.avatar}>
        <PersonRoundedIcon />
      </Avatar>
      <form className={classes.form} noValidate>
        <TextFieldStyled
          className={classes.textField}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={({ currentTarget }) => {
            setEmail(currentTarget.value);
          }}
        />
        <TextFieldStyled
          className={classes.textField}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={({ currentTarget }) => {
            setPassword(currentTarget.value);
          }}
        />
        <Button
          variant="contained"
          className={classes.btnSubmit}
          onClick={handleLogin}
        >
          Sign In
          </Button>
        <Grid container>
          <Grid item>
            <Link href="/register" variant="body2" className={classes.label}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  vertical: {
    marginTop: theme.spacing(16),
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
    marginTop: theme.spacing(1)
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
    fontFamiliy: "Roboto",
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

export default LoginPage;

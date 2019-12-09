import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import HomeAuth from "../pages/HomeAuthUser";
import Polygon from "../assets/polygon.jpg";
import Background from "../assets/background.jpg";
import { Tooltip } from "@material-ui/core";

export default function HomePage({ history }) {
  const classes = useStyles();

  const role = window.localStorage.getItem("role")

  return (
    <div className={classes.bckg}>
      <Container className={classes.vertical} maxWidth="xl">
        <div>
          <GoldTooltip title="Click to check our offer!" placement="top">
            <a href="rent-a-cars">
              <img src={require("../assets/welcome.jpg")} alt="Welcome"
                className={classes.welcome} />
            </a>
          </GoldTooltip>
        </div>
        <Container >
          {role === "USER" ? <HomeAuth /> : null}
        </Container>
      </Container >
    </div>

  );
}

const useStyles = makeStyles(theme => ({
  vertical: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    background: `url(${Polygon})`,
    backgroundSize: "cover",
    paddingBottom: "5.5%"
  },
  bckg: {
    background: `url(${Background})`,
    backgroundRepeat: "repeat",
  },
  welcome: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "75%",
    borderRadius: "18px",
    marginTop: 25,
  },
}));

const GoldTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#004d4d",
    color: "#c0c0c0",
    boxShadow: theme.shadows[1],
    fontSize: 25,
    width: "100%",
    textJustify: "auto",
    fontFamily: "Corbel"
  }
}))(Tooltip);

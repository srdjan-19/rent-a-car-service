import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";
import UserProfile from "./pages/UserProfile";
import RentACarPage from "./pages/RentACars";
import RentACarProfilePage from "./pages/RentACarProfile";
import Friends from "./components/user/Friends";
import Background from "./assets/polygon.jpg";

const App = () => {
  return (
    <Switch style={{
      background: `(${Background})`, backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegistrationPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/rent-a-cars" component={RentACarPage} />
      <Route
        exact
        path="/rent-a-cars/:id/"
        component={RentACarProfilePage}
      />
      <Route exact path="/user/:id" component={UserProfile} />
      <Route exact path="/user/:id/friends" component={Friends} />
      <Route
        exact
        path="/page-not-found"
        component={() => <h1>Page not found</h1>}
      />
      <Redirect from="*" to="/page-not-found" />
    </Switch >
  );
};

export default App;

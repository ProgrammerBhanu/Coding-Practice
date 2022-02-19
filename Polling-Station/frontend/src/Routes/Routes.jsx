import React from "react";
import Login from "../components/login";
import { Route } from "react-router-dom";
import Register from "../components/register";
import Home from "../HomePage/home";
import { Switch } from "react-router-dom";
import Stations from "../HomePage/stations";

export default function Routes() {
  return (
    <div style={{ marginTop: "6%" }}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route
          path="/:city"
          exact
          render={(props) => <Stations {...props} />}
        />
      </Switch>
    </div>
  );
}
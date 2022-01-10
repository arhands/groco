import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Signup from "./components/Signup/Signup";
import Landing from "./components/Landing/Landing";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/landing">
                <Landing />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}

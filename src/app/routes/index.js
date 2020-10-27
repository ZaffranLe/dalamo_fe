import React, { lazy } from "react";
import { Router, BrowserRouter } from "react-router-dom";
import { Switch, Redirect, Route } from "react-router";
import NotFound from "../components/NotFound";
import UserLayout from "../components/Layout/User.jsx";
const HomePage = lazy(() => import("../pages/home-page"));

function LayoutRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <UserLayout>
                    <Component {...matchProps} />
                </UserLayout>
            )}
        />
    );
}

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <LayoutRoute exact path="/" component={HomePage} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;

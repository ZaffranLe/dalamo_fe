import React, { lazy } from "react";
import { Router, BrowserRouter } from "react-router-dom";
import { Switch, Redirect, Route } from "react-router";
import NotFound from "../components/NotFound";
import UserLayout from "../components/Layout/User.jsx";
import jwt from "jsonwebtoken";
const Brand = lazy(() => import("../pages/brand"));
const HomePage = lazy(() => import("../pages/home-page"));
const Cart = lazy(() => import("../pages/cart"));
const Product = lazy(() => import("../pages/product"));
const ProductDetail = lazy(() => import("../pages/product/detail"));

function LayoutRoute({ component: Component, ...rest }) {
    const token = localStorage.getItem("token");
    if (token) {
        const tokenInfo = jwt.decode(token);
        window.userInfo = tokenInfo["user"];
    }
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <UserLayout history={matchProps.history}>
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
                <LayoutRoute exact path="/cart" component={Cart} />
                <LayoutRoute exact path="/brand" component={Brand} />
                <LayoutRoute exact path="/brand/:brandSlug" component={Product} />
                <LayoutRoute exact path="/product" component={Product} />
                <LayoutRoute exact path="/product/:categorySlug" component={Product} />
                <LayoutRoute exact path="/product/detail/:productSlug" component={ProductDetail} />
                <LayoutRoute exact path="/" component={HomePage} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;

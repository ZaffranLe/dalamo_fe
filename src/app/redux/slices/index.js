import { combineReducers } from "@reduxjs/toolkit";
import compare from "./compare";
import login from "./login";
import product from "./product";
import category from "./category";
import cart from "./cart";
import comment from "./comment";

const rootReducer = combineReducers({
    compare,
    login,
    product,
    category,
    cart,
    comment,
});

export default rootReducer;

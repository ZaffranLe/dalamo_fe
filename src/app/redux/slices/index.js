import { combineReducers } from "@reduxjs/toolkit";
import compare from "./compare";
import login from "./login";
import product from "./product";
import category from "./category";
import brand from "./brand";
import cart from "./cart";
import comment from "./comment";
import receipt from "./receipt";

const rootReducer = combineReducers({
    compare,
    login,
    product,
    category,
    brand,
    cart,
    comment,
    receipt,
});

export default rootReducer;

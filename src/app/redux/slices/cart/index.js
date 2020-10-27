import { toast } from "react-toastify";
import axiosClient from "../../../utils/common/axiosClient";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    products: [],
};

const cart = createSlice({
    name: "category",
    initialState: initState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
            toast.success("Thêm sản phẩm vào giỏ hàng thành công.")
        },
        removeProduct: (state, action) => {
            const idx = state.products.indexOf(action.payload);
            state.products.splice(idx, 1);
        }
    },
});

const { reducer, actions } = cart;
export const { setProducts, addProduct, removeProduct } = actions;

export default reducer;

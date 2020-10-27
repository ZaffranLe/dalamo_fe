import { toast } from "react-toastify";
import axios from "../../../utils/common/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const initState = {
    products: [],
    modalState: false,
};

const compare = createSlice({
    name: "compare",
    initialState: initState,
    reducers: {
        openModal: (state, action) => {
            state.modalState = true;
        },
        closeModal: (state, action) => {
            state.modalState = false;
        },
        refreshCompare: (state, action) => {
            state.products = [];
            return state;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
            return state;
        },
        removeProduct: (state, action) => {
            const idx = state.products.findIndex(action.payload);
            state.products.splice(idx, 1);
        },
    },
});

const { reducer, actions } = compare;
export const { openModal, closeModal, refreshCompare, addProduct, removeProduct } = actions;

export const addProductToCompare = (product) => {
    return async (dispatch) => {
        try {
            dispatch(addProduct(product));
            dispatch(openModal());
        } catch (err) {
            console.log(err);
            toast.error("Thêm sản phẩm để so sánh thất bại!");
        }
    };
};

export default reducer;

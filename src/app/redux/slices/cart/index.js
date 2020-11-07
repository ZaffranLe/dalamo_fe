import { toast } from "react-toastify";
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
            const existProduct = state.products.find(
                (product) => product.id === action.payload.product.id
            );
            const quantity = parseInt(action.payload.quantity);
            if (existProduct) {
                existProduct.cartQuantity += quantity;
            } else {
                state.products.push({
                    ...action.payload.product,
                    cartQuantity: quantity,
                });
                toast.success("Thêm sản phẩm vào giỏ hàng thành công.");
            }
        },
        modifyProduct: (state, action) => {
            state.products = state.products.map((product) =>
                product.id === action.payload.id ? action.payload : product
            );
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload.id);
        },
    },
});

const { reducer, actions } = cart;
export const { setProducts, addProduct, modifyProduct, removeProduct } = actions;

function refreshCart() {
    return (dispatch) => {
        dispatch(setProducts([]));
    };
}

function changeProductQuantity(product, newQuantity) {
    return (dispatch) => {
        const modifiedProduct = { ...product, cartQuantity: newQuantity };
        dispatch(modifyProduct(modifiedProduct));
    };
}

function addProductToCart(product, quantity = 1) {
    return (dispatch) => {
        dispatch(addProduct({ product, quantity }));
    };
}

export { refreshCart, changeProductQuantity, addProductToCart };

export default reducer;

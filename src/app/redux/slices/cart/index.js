import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/common/axiosClient";

const initState = {
    products: [],
    isLoading: false,
    receipts: [],
    isSucceed: false,
    openCart: false,
    mouseEnterCart: false,
};

const cart = createSlice({
    name: "cart",
    initialState: initState,
    reducers: {
        setReceipts: (state, action) => {
            state.receipts = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProduct: (state, action) => {
            const existProduct = state.products.find((product) => product.id === action.payload.product.id);
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
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        },
        setOpenCart: (state, action) => {
            state.openCart = action.payload;
        },
        setMouseEnterCart: (state, action) => {
            state.mouseEnterCart = action.payload;
        },
    },
});

const { reducer, actions } = cart;
export const {
    setReceipts,
    setProducts,
    addProduct,
    modifyProduct,
    removeProduct,
    setIsLoading,
    setIsSucceed,
    setOpenCart,
    setMouseEnterCart,
} = actions;

function fetchReceipts(currentReceipts = []) {
    return async (dispatch) => {
        try {
            if (currentReceipts.length === 0) {
                dispatch(setIsLoading(true));
            }
            const data = await axiosClient({
                url: "/client/order-receipt",
                method: "get",
            });
            dispatch(setReceipts(data));
            dispatch(setIsLoading(false));
            dispatch(setIsSucceed(false));
        } catch (e) {
            console.error(e);
            toast.error("Có lỗi xảy ra với hệ thống.");
        }
    };
}

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

function submitOrder(data) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            await axiosClient({
                url: "/client/order-receipt",
                method: "post",
                data,
            });
            toast.success("Cảm ơn bạn đã ủng hộ SMMGate. Đơn hàng sẽ được nhanh chóng xác nhận và vận chuyển.");
            dispatch(setProducts([]));
            dispatch(setIsSucceed(true));
        } catch (e) {
            console.error(e);
            toast.error("Có lỗi xảy ra với hệ thống! Vui lòng thử lại sau.");
        } finally {
            dispatch(setIsLoading(false));
        }
    };
}

export { refreshCart, fetchReceipts, changeProductQuantity, addProductToCart, submitOrder };

export default reducer;

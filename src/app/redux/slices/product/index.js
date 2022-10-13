import { toast } from "react-toastify";
import axiosClient from "../../../utils/common/axiosClient";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    products: [],
    hotProducts: [],
    newProducts: [],
    newArrivalProducts: [],
    isLoading: false,
    detailProduct: null,
    isSucceed: false,
};

const product = createSlice({
    name: "product",
    initialState: initState,
    reducers: {
        setHotProducts: (state, action) => {
            state.hotProducts = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setNewProducts: (state, action) => {
            state.newProducts = action.payload;
        },
        setNewArrivalProducts: (state, action) => {
            state.newArrivalProducts = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setDetailProduct: (state, action) => {
            state.detailProduct = action.payload;
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        }
    },
});

const { reducer, actions } = product;
export const {
    setProducts,
    setHotProducts,
    setNewArrivalProducts,
    setNewProducts,
    setIsLoading,
    setDetailProduct,
    setIsSucceed,
} = actions;

function fetchProducts(currentProducts = []) {
    const _fetchApi = () => {
        return axiosClient.get("/client/product");
    };

    return async (dispatch) => {
        try {
            if (currentProducts.length === 0) {
                dispatch(setIsLoading(true));
            }
            const data = await _fetchApi();
            dispatch(setProducts(data));
            dispatch(setIsLoading(false));
        } catch (e) {
            console.error(e);
        }
    };
}

function fetchProduct(id) {
    return async dispatch => {
        try {
            dispatch(setIsLoading(true));
            let data = await axiosClient.get(`/client/product/${id}`);
            if (Object.keys(data).length === 0) {
                data = null;
            }
            dispatch(setDetailProduct(data));
            dispatch(setIsSucceed(false));
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setIsLoading(false));
        }
    }
}

function fetchHotProducts(currentProducts = []) {
    const _fetchApi = () => {
        return axiosClient.get("/client/product");
    };

    return async (dispatch) => {
        try {
            if (currentProducts.length === 0) {
                dispatch(setIsLoading(true));
            }
            const data = await _fetchApi();
            dispatch(setHotProducts(data));
            dispatch(setIsLoading(false));
        } catch (e) {
            console.error(e);
        }
    };
}

function fetchNewProducts(currentProducts = []) {
    const _fetchApi = () => {
        return axiosClient.get("/client/product");
    };

    return async (dispatch) => {
        try {
            if (currentProducts.length === 0) {
                dispatch(setIsLoading(true));
            }
            const data = await _fetchApi();
            dispatch(setNewProducts(data));
            dispatch(setIsLoading(false));
        } catch (e) {
            console.error(e);
        }
    };
}

function fetchNewArrivalProducts(currentProducts = []) {
    const _fetchApi = () => {
        return axiosClient.get("/client/product");
    };

    return async (dispatch) => {
        try {
            if (currentProducts.length === 0) {
                dispatch(setIsLoading(true));
            }
            const data = await _fetchApi();
            dispatch(setNewArrivalProducts(data));
        } catch (e) {
            console.error(e);
        } finally {
            if (currentProducts.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function submitComment(comment) {
    return async dispatch => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/client/comment",
                method: "post",
                data: comment
            });
            dispatch(setIsSucceed(true));
            toast.success("SMMGate xin chân thành cảm ơn ý kiến đóng góp của bạn.");
        } catch (e) {
            console.error(e);
            toast.error("Có lỗi xảy ra trên hệ thống! Vui lòng thử lại sau.")
        } finally {
            dispatch(setIsLoading(false));
        }
    }
}

export { fetchProducts, fetchHotProducts, fetchNewProducts, fetchNewArrivalProducts, fetchProduct, submitComment };

export default reducer;

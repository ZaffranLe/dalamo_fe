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
};

const homePage = createSlice({
    name: "homePage",
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
    },
});

const { reducer, actions } = homePage;
export const {
    setProducts,
    setHotProducts,
    setNewArrivalProducts,
    setNewProducts,
    setIsLoading,
    setDetailProduct,
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
            dispatch(setIsLoading(false));
        } catch (e) {
            console.error(e);
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
            dispatch(setIsLoading(false));
        } catch (e) {
            console.error(e);
        }
    };
}

export { fetchProducts, fetchHotProducts, fetchNewProducts, fetchNewArrivalProducts, fetchProduct };

export default reducer;

import { toast } from "react-toastify";
import axiosClient from "../../../utils/common/axiosClient";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    hotProducts: [],
    newProducts: [],
    newArrivalProducts: [],
    isLoading: false,
};

const homePage = createSlice({
    name: "homePage",
    initialState: initState,
    reducers: {
        setHotProducts: (state, action) => {
            state.hotProducts = action.payload;
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
    },
});

const { reducer, actions } = homePage;
export const { setHotProducts, setNewArrivalProducts, setNewProducts, setIsLoading } = actions;

function fetchHotProducts(currentProducts = []) {
    const _fetchApi = () => {
        return axiosClient.get("/client/product");
    }

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
    }

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
    }

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

export {
    fetchHotProducts,
    fetchNewProducts,
    fetchNewArrivalProducts,
}

export default reducer;

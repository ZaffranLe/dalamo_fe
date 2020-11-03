import { toast } from "react-toastify";
import axiosClient from "../../../utils/common/axiosClient";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    brands: [],
    isLoading: false,
};

const brand = createSlice({
    name: "brand",
    initialState: initState,
    reducers: {
        setBrands: (state, action) => {
            state.brands = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { reducer, actions } = brand;
export const { setBrands, setIsLoading } = actions;

function fetchBrands(currentBrands = []) {

    return async (dispatch) => {
        try {
            if (currentBrands.length === 0) {
                dispatch(setIsLoading(true));
            }
            const data = await axiosClient.get("/client/brand");;
            dispatch(setBrands(data));
            dispatch(setIsLoading(false));
        } catch (e) {
            console.error(e);
            toast.error("Có lỗi xảy ra với hệ thống.");
        }
    };
}

export {
    fetchBrands,
}

export default reducer;

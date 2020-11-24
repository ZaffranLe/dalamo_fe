import { toast } from "react-toastify";
import axiosClient from "../../../utils/common/axiosClient";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    receipts: [],
    isLoading: false,
};

const receipt = createSlice({
    name: "receipt",
    initialState: initState,
    reducers: {
        setReceipts: (state, action) => {
            state.receipts = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { reducer, actions } = receipt;
export const { setReceipts, setIsLoading } = actions;

function fetchReceipts(currentReceipts = []) {

    return async (dispatch) => {
        try {
            if (currentReceipts.length === 0) {
                dispatch(setIsLoading(true));
            }
            const data = await axiosClient.get("/client/order-receipt");;
            dispatch(setReceipts(data));
            dispatch(setIsLoading(false));
        } catch (e) {
            console.error(e);
            toast.error("Có lỗi xảy ra với hệ thống.");
        }
    };
}

export {
    fetchReceipts,
}

export default reducer;

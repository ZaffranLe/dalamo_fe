import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/common/axiosClient";

const initState = {
    isLoading: false,
    detailReceipt: null,
};

const receipt = createSlice({
    name: "receipt",
    initialState: initState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setDetailReceipt: (state, action) => {
            state.detailReceipt = action.payload;
        },
    },
});

const { reducer, actions } = receipt;
export const { setIsLoading, setDetailReceipt } = actions;

function fetchDetailReceipt(id) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const receipt = await axiosClient({
                url: `/client/order-receipt/${id}`,
                method: "get",
            });
            dispatch(setDetailReceipt(receipt));
        } catch (e) {
            toast.error("Có lỗi xảy ra trên hệ thống! Vui lòng thử lại sau.");
            console.error(e);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
}

export { fetchDetailReceipt };

export default reducer;

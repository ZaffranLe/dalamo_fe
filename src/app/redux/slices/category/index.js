import { toast } from "react-toastify";
import axiosClient from "../../../utils/common/axiosClient";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    categories: [],
    isLoading: false,
};

const category = createSlice({
    name: "category",
    initialState: initState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { reducer, actions } = category;
export const { setCategories, setIsLoading } = actions;

function fetchCategories(currentCategories = []) {
    const _fetchApi = () => {
        return axiosClient.get("/client/category");
    }

    return async (dispatch) => {
        try {
            if (currentCategories.length === 0) {
                dispatch(setIsLoading(true));
            }
            const data = await _fetchApi();
            dispatch(setCategories(data));
            dispatch(setIsLoading(false));
        } catch (e) {
            console.error(e);
            toast.error("Có lỗi xảy ra với hệ thống.");
        }
    };
}

export {
    fetchCategories,
}

export default reducer;

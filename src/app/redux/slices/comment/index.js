import { toast } from "react-toastify";
import axiosClient from "../../../utils/common/axiosClient";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    comments: [],
    isLoading: false,
};

const comment = createSlice({
    name: "comment",
    initialState: initState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { reducer, actions } = comment;
export const { setComments, setIsLoading } = actions;

function fetchComments(currentComments = []) {
    const _fetchApi = () => {
        return axiosClient.get("/comment");
    }

    return async (dispatch) => {
        try {
            if (currentComments.length === 0) {
                dispatch(setIsLoading(true));
            }
            const data = await _fetchApi();
            dispatch(setComments(data));
            dispatch(setIsLoading(false));
        } catch (e) {
            console.error(e);
            toast.error("Có lỗi xảy ra với hệ thống.");
        }
    };
}

export {
    fetchComments,
}

export default reducer;

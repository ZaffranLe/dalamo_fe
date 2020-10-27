import { toast } from "react-toastify";
import axiosClient from "../../../utils/common/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const initState = {
    modalState: false,
    defaultActive: "login",
};

const login = createSlice({
    name: "login",
    initialState: initState,
    reducers: {
        openModal: (state, action) => {
            state.modalState = true;
            state.defaultActive = action.payload;
        },
        closeModal: (state, action) => {
            state.modalState = false;
        },
        setDefaultActive: (state, action) => {
            state.defaultActive = action.payload;
        }
    },
});

const { reducer, actions } = login;
export const { openModal, closeModal, setDefaultActive} = actions;


export default reducer;

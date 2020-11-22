import { toast } from "react-toastify";
import axiosClient from "../../../utils/common/axiosClient";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

const { createSlice } = require("@reduxjs/toolkit");

const initState = {
    modalState: false,
    defaultActive: "login",
    loggedIn: false,
};

const loginSlice = createSlice({
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
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        }
    },
});

const { reducer, actions } = loginSlice;
export const { openModal, closeModal, setDefaultActive, setLoggedIn } = actions;

function register(user) {
    return async (dispatch) => {
        try {
            const resp = await axiosClient({
                url: "/register",
                method: "post",
                data: user,
            });
            toast.success("Đăng ký thành công.");
            dispatch(setDefaultActive("login"));
        } catch (e) {
            toast.error("Đăng ký thất bại! Vui lòng thử lại sau.");
            console.error(e);
        }
    };
}

function login(credentials) {
    return async (dispatch) => {
        try {
            const resp = await axiosClient({
                url: "/login",
                method: "post",
                data: credentials,
            });
            const token = resp["token"];
            window.localStorage.setItem("token", token);
            const tokenInfo = jwt.decode(token);
            window.userInfo = tokenInfo["user"];
            toast.success("Đăng nhập thành công.");
            setLoggedIn(true);
            dispatch(closeModal());
        } catch (e) {
            toast.error("Đăng nhập thất bại! Vui lòng thử lại sau.");
            console.error(e);
        }
    };
}

function logout(history) {
    return async (dispatch) => {
        try {
            const resp = await axiosClient({
                url: "/logout",
                method: "post",
            });
            window.localStorage.removeItem("token");
            window.userInfo = null;
            history.push("/");
            toast.success("Đăng xuất thành công.");
            setLoggedIn(false);
        } catch (e) {
            toast.error("Đăng xuất thất bại! Vui lòng thử lại sau.");
            console.error(e);
        }
    };
}

export { register, login, logout };

export default reducer;

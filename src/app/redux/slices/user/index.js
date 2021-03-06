import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/common/axiosClient";
import { logout } from "../login";

const initState = {
    isLoading: false,
    userModal: false,
};

const user = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUserModal: (state, action) => {
            state.userModal = action.payload;
        },
    },
});

const { reducer, actions } = user;
export const { setIsLoading, setUserModal } = actions;

function updateUserInfo(user, history) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/client/user/${user["id"]}`,
                method: "put",
                data: user,
            });
            toast.success("Cập nhật thông tin thành công! Vui lòng đăng nhập lại.");
            dispatch(setUserModal(false));
            dispatch(logout(history));
        } catch (e) {
            toast.error("Cập nhật thông tin thất bại! Vui lòng thử lại sau.")
            console.error(e);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
}

export { updateUserInfo };

export default reducer;

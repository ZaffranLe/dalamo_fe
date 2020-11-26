import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const initState = {
    openSearchResult: false,
    searchResults: [],
    searchText: '',
    mouseEnterSearchResult: false,
};

const header = createSlice({
    name: "header",
    initialState: initState,
    reducers: {
        setOpenSearchResult: (state, action) => {
            state.openSearchResult = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload.result;
            state.searchText = action.payload.text;
        },
        setMouseEnterSearchResult: (state, action) => {
            state.mouseEnterSearchResult = action.payload;
        }
    },
});

const { reducer, actions } = header;
export const { setOpenSearchResult, setSearchResults, setMouseEnterSearchResult } = actions;

export default reducer;

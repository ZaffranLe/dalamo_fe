import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/redux/store";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
    <Provider store={store}>
        <App />
        <ToastContainer />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

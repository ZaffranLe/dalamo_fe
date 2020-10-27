import React from "react";
import "./Loading.scss";
import { Spin } from "antd";

function Loading(props) {
  return (
    <div className="loading">
      <Spin tip="Loading..."></Spin>
    </div>
  );
}

export default Loading;

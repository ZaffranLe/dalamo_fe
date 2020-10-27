import React from "react";
import "./NotFound.scss";
import { Result, Button } from "antd";

function NotFound(props) {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Ohh, Trang bạn yêu cầu không tồn tại."
      extra={<Button type="primary">Về Dashboard</Button>}
    />
    // <div className="error">
    //   <FrownOutlined />
    //   <h1>404 Not Found</h1>
    // </div>
  );
}

export default NotFound;

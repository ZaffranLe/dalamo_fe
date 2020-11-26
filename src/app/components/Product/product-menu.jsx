import { Row, Col, Image, Divider } from "antd";
import React from "react";

function ProductMenu({ product }) {
    return (
        <div>
            <Image src={product["images"][0]["thumbnailUrl"]} alt="img" />
            <span>{product["name"]}</span>
            <br/>
            <span>{product["name"]}</span>
        </div>
    );
}

export default ProductMenu;

import React from "react";
import { Row, Col, PageHeader } from "antd";
import {} from "@ant-design/icons";

function ProductDetail(props) {
    const {
        match: {
            params: { slug },
        },
    } = props;

    return (
        <>
            <Row>
                <Col span={18} offset={3}>
                    <PageHeader ghost={false} title="Abc" />
                </Col>
            </Row>
        </>
    );
}

export default ProductDetail;

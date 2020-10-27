import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Skeleton } from "antd";
import ProductCard from "./product-card";

function ProductCardGrid(props) {
    const { data, loading } = props;
    return (
        <>
            <Row gutter={16}>
                <Skeleton loading={loading}>
                    {data.map((p, idx) => (
                        <Col key={idx} lg={6} md={8} sm={12} xs={24}>
                            <ProductCard product={p} />
                        </Col>
                    ))}
                </Skeleton>
            </Row>
        </>
    );
}

ProductCardGrid.propTypes = {
    data: PropTypes.array,
};

ProductCardGrid.defaultProps = {
    data: [],
};

export default ProductCardGrid;

import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Skeleton } from "antd";
import BrandCard from "./brand-card";

function BrandCardGrid(props) {
    const { data, loading } = props;
    return (
        <>
            <Row gutter={16}>
                <Skeleton loading={loading}>
                    {data.map((p, idx) => (
                        <Col key={idx} lg={6} md={8} sm={12} xs={24}>
                            <BrandCard brand={p} />
                        </Col>
                    ))}
                </Skeleton>
            </Row>
        </>
    );
}

BrandCardGrid.propTypes = {
    data: PropTypes.array,
};

BrandCardGrid.defaultProps = {
    data: [],
};

export default BrandCardGrid;

import React from "react";
import { Col, Card } from "antd";

function FeaturedSection(props) {
    return (
        <>
            <Col span={8}>
                <Card className="card-left">
                    <h2 className="card-title">Free shipping</h2>
                    <h3>FREE SHIPPING ON ALL ORDER</h3>
                </Card>
            </Col>
            <Col span={8}>
                <Card className="card-middle">
                    <h2 className="card-title">Freshness guarantee</h2>
                    <h3>EVERY PRODUCT IS ITS BEST STATE</h3>
                </Card>
            </Col>
            <Col span={8}>
                <Card className="card-right">
                    <h2 className="card-title">Healthy, Environment friendly</h2>
                    <h3>A GOOD HEALTH BRINGS A GOOD LIFE</h3>
                </Card>
            </Col>
        </>
    );
}

export default FeaturedSection;

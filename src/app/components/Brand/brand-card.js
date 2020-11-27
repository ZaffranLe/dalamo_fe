import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Card, Carousel, Col, Image, Row, Tooltip } from "antd";
import PlaceHolderImg from "../../assets/img/product-placeholder.png";
import { useDispatch } from "react-redux";
import "./Brand.scss";
function BrandCard(props) {
    const { brand } = props;
    const dispatch = useDispatch();

    return (
        <Card
            hoverable
            bordered={false}
            style={{ width: "100%" }}
            cover={
                <div style={{ width: "100%" }}>
                    <div>
                        <Image
                            className="brand-card__img"
                            alt="Placeholder"
                            src={brand["imagrUrl"] ? brand["imagrUrl"] : PlaceHolderImg}
                        />
                    </div>
                </div>
            }
        >
            <Row>
                <Col span={24} className="text-center">
                    <h4 className="brand-card__name">{brand["name"]}</h4>
                </Col>
            </Row>
        </Card>
    );
}

BrandCard.propTypes = {
    brand: PropTypes.object.isRequired,
};

export default BrandCard;

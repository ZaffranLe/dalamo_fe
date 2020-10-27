import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Card, Carousel, Col, Row, Tooltip } from "antd";
import { EyeTwoTone, RetweetOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import PlaceHolderImg from "../../assets/img/product-placeholder.png";
import PlaceHolderImg2 from "../../assets/img/product-placeholder-2.png";
import { useDispatch } from "react-redux";
import { addProductToCompare } from "../../redux/slices/compare";
import { addProduct as addProductToCart } from "../../redux/slices/cart";
import { calcDiscountPrice, formatVietnameseCurrency } from "../../utils/common/common";
import "./Product.scss";
function ProductCard(props) {
    const { product } = props;
    const carousel = useRef(null);
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(true);

    const handleHovering = () => {
        carousel.current.next();
        setHidden(false);
    };

    const handleStopHovering = () => {
        setHidden(true);
    };

    const handleAddCompareProduct = () => {
        dispatch(addProductToCompare(product));
    };

    const handleAddProductToCart = () => {
        dispatch(addProductToCart(product));
    };

    return (
        <Card
            hoverable
            onMouseEnter={handleHovering}
            onMouseLeave={handleStopHovering}
            style={{ width: "100%" }}
            cover={
                <div style={{ width: "100%", position: "relative" }}>
                    <Carousel speed={500} ref={carousel}>
                        <div>
                            <img className="product-card__img" alt="Placeholder 1" src={PlaceHolderImg} />
                        </div>
                        <div>
                            <img className="product-card__img" alt="Placeholder 2" src={PlaceHolderImg2} />
                        </div>
                    </Carousel>
                    <div className="custom-overlay" style={{ marginTop: 10, marginLeft: 10 }}>
                        {Boolean(product["isDiscount"]) && (
                            <span className="text--big" style={{ color: "#FA6BFE" }}>
                                -{product["discountPercent"]}%
                            </span>
                        )}
                    </div>
                    <div
                        className="custom-overlay custom-overlay-dark-bg"
                        hidden={hidden}
                        style={{ display: "table", textAlign: "center" }}
                    >
                        <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                            <Tooltip title="Thêm sản phẩm vào giỏ hàng">
                                <Button
                                    onClick={handleAddProductToCart}
                                    style={{ color: "green" }}
                                    size="large"
                                    shape="circle"
                                    icon={<ShoppingCartOutlined />}
                                />
                            </Tooltip>
                            <Tooltip title="Xem chi tiết">
                                <Button size="large" shape="circle" icon={<EyeTwoTone />} />
                            </Tooltip>
                            <Tooltip title="So sánh sản phẩm">
                                <Button
                                    onClick={handleAddCompareProduct}
                                    size="large"
                                    shape="circle"
                                    icon={<RetweetOutlined />}
                                />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            }
        >
            <Row>
                <Col span={24}>
                    <h4 className="product-card__name">{product["name"]}</h4>
                </Col>
            </Row>
            <p>
                {Boolean(product["isDiscount"]) && (
                    <span>
                        <span>
                            {formatVietnameseCurrency(calcDiscountPrice(product["price"], product["discountPercent"]))}
                        </span>
                        {" - "}
                    </span>
                )}
                <span className={`${product["isDiscount"] && "original-price"}`}>
                    {formatVietnameseCurrency(product["price"])}
                </span>
            </p>
        </Card>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;

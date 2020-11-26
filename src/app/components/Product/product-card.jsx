import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Card, Carousel, Col, Row, Tooltip, Image } from "antd";
import { CheckOutlined, EyeTwoTone, PhoneFilled, RetweetOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import PlaceHolderImg from "../../assets/img/product-placeholder.png";
import PlaceHolderImg2 from "../../assets/img/product-placeholder-2.png";
import { useDispatch } from "react-redux";
import { addProductToCompare } from "../../redux/slices/compare";
import { addProductToCart } from "../../redux/slices/cart";
import { calcDiscountPrice, formatVietnameseCurrency } from "../../utils/common/common";
import "./Product.scss";
import { Link } from "react-router-dom";

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
                <div style={{ width: "100%", height: 300, position: "relative" }}>
                    <Carousel speed={500} ref={carousel}>
                        {product["images"].map((img) => (
                            <div key={img["id"]}>
                                <Image
                                    height="300px"
                                    className="product-card__img"
                                    src={`${img["url"]}/tr:h-300,w-300`}
                                    alt="Product image"
                                />
                            </div>
                        ))}
                    </Carousel>
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
                                <Link to={`/product/detail/${product["slug"]}.${product["id"]}`}>
                                    <Button size="large" shape="circle">
                                        <EyeTwoTone />
                                    </Button>
                                </Link>
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
                    <Link to={`/product/detail/${product["slug"]}.${product["id"]}`}>
                        <h4 className="product-card__name">{product["name"]}</h4>
                    </Link>
                </Col>
            </Row>
            <p>
                {Boolean(product["isDiscount"]) && (
                    <span>
                        <span className="text-bold">
                            {formatVietnameseCurrency(calcDiscountPrice(product["price"], product["discountPercent"]))}
                        </span>
                        {" - "}
                    </span>
                )}
                <span className={`${product["isDiscount"] && "original-price"} text-bold`}>
                    {formatVietnameseCurrency(product["price"])}
                </span>
            </p>
            <p>
                {product["storageQuantity"] > 0 ? (
                    <span style={{ color: "#4EC067" }}>
                        <CheckOutlined /> Còn hàng
                    </span>
                ) : (
                    <span>
                        <PhoneFilled /> Liên hệ
                    </span>
                )}
            </p>
        </Card>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;

import React from "react";
import { Button, Carousel, Col, Image, Row, Tooltip } from "antd";
import PlaceHolderImg from "../../../assets/img/product-placeholder.png";
import { formatVietnameseCurrency } from "../../../utils/common/common";
import PropTypes from "prop-types";
import { RetweetOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addProductToCompare } from "../../../redux/slices/compare";
import { addProductToCart } from "../../../redux/slices/cart";
import { useHistory } from "react-router-dom";

function ProductCarousel(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { products } = props;
    const handleAddCompareProduct = (product) => {
        dispatch(addProductToCompare(product));
    };

    const handleAddProductToCart = (product) => {
        dispatch(addProductToCart(product));
    };

    const handleViewProduct = (product) => {
        history.push(`/product/detail/${product["slug"]}.${product["id"]}`);
    };

    return (
        <Col span={12}>
            <Carousel speed={2000} autoplay={true} autoplaySpeed={10000} pauseOnHover={false} dots={false}>
                {products.map((product) => (
                    <div key={product["id"]}>
                        <Row>
                            <Col span={16} push={4}>
                                <Row
                                    align="middle"
                                    gutter={10}
                                    style={{
                                        border: "1px solid #EEEFEE",
                                        marginTop: 5,
                                        marginBottom: 5,
                                        padding: 10,
                                        cursor: "pointer",
                                        backgroundColor: "white",
                                    }}
                                >
                                    <Col span={14} onClick={() => handleViewProduct(product)}>
                                        {product["images"].length > 0 ? (
                                            <Image
                                                alt="Product image"
                                                className="product-card__img"
                                                src={product["images"][0]["url"]}
                                            />
                                        ) : (
                                            <Image
                                                src={PlaceHolderImg}
                                                className="product-card__img"
                                                alt="Product image"
                                            />
                                        )}
                                    </Col>
                                    <Col span={10}>
                                        <div onClick={() => handleViewProduct(product)}>
                                            <h5 className="txt--uppercase txt--dark-olive txt--ellipsis txt--ellipsis-1">
                                                {product["categoryName"] || product["brandName"]}
                                            </h5>
                                            <h4 className="txt--ellipsis txt--ellipsis-3">{product["name"]}</h4>
                                            <h4 className="txt--dark-olive">
                                                {formatVietnameseCurrency(product["price"])}
                                            </h4>
                                            <p className="txt--ellipsis txt--ellipsis-5" style={{ marginTop: 10 }}>
                                                {product["description"]}
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() => handleAddProductToCart(product)}
                                            className="bg--dark-olive txt--uppercase"
                                        >
                                            Cho vào giỏ hàng
                                        </Button>
                                        <Tooltip title="So sánh sản phẩm">
                                            <Button
                                                onClick={() => handleAddCompareProduct(product)}
                                                className="bg--dark-olive"
                                            >
                                                <RetweetOutlined />
                                            </Button>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Carousel>
        </Col>
    );
}

ProductCarousel.propTypes = {
    products: PropTypes.array,
};

ProductCarousel.defaultProps = {
    products: [],
};

export default ProductCarousel;

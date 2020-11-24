import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Image,
    Alert,
    Skeleton,
    Carousel,
    Input,
    Button,
    Tabs,
    Divider,
    Comment,
} from "antd";
import { PlusOutlined, MinusOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { fetchProduct, fetchProducts, setDetailProduct } from "../../redux/slices/product";
import { addProductToCart } from "../../redux/slices/cart";
import { useDispatch, useSelector } from "react-redux";
import PlaceHolderImg1 from "../../assets/img/product-placeholder.png";
import PlaceHolderImg2 from "../../assets/img/product-placeholder-2.png";
import { calcDiscountPrice, formatVietnameseCurrency } from "../../utils/common/common";
import ProductCard from "../../components/Product/product-card";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import faker from "faker";
faker.locale = "vi";

function ProductDetail(props) {
    const { detailProduct: product, isLoading, products } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const {
        match: {
            params: { productSlug },
        },
    } = props;

    const [quantity, setQuantity] = useState(1);
    const [disableAddToCart, setDisableAddToCart] = useState(false);
    const [averageRating, setAverageRating] = useState([0, 0, 0, 0, 0]);
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts(products));
        }
        return () => {
            dispatch(setDetailProduct(null));
        };
    }, []);

    useEffect(() => {
        if (productSlug) {
            const [slug, id] = productSlug.split(".");
            dispatch(fetchProduct(id));
        }
    }, [productSlug]);

    useEffect(() => {
        if (product) {
            const [slug, id] = productSlug.split(".");
            if (product["slug"] != slug) {
                dispatch(setDetailProduct(null));
            } else {
                if (product["comments"].length > 0) {
                    const avgRating = Math.ceil(
                        product["comments"].map((c) => c["rate"]).reduce((sum, rate) => sum + rate)
                    );
                    const rating = [0, 0, 0, 0, 0].fill(1, 0, avgRating);
                    setAverageRating(rating);
                }
            }
        }
    }, [product]);

    const handleInputQuantity = (e) => {
        if (isNaN(e.key)) {
            e.preventDefault();
        }
    };

    const handleBlurQuantity = (e) => {
        if (quantity < 1) {
            if (!disableAddToCart) {
                setDisableAddToCart(true);
            }
        }
    };

    const handleChangeQuantity = (e) => {
        let newQuantity = parseInt(e.target.value);
        if (isNaN(newQuantity)) {
            newQuantity = "";
        }
        setQuantity(newQuantity);
    };

    const handleFocusQuantityInput = () => {
        if (disableAddToCart) {
            setDisableAddToCart(false);
        }
    };

    const handleAddToCart = () => {
        dispatch(addProductToCart(product, quantity));
    };

    const handlePlusQuantity = () => {
        if (quantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleMinusQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const tabPaneStyle = {
        maxHeight: 500,
        overflow: "auto",
    };

    return (
        <>
            <Row>
                <Col span={18} offset={3}>
                    <Skeleton active={true} loading={isLoading}>
                        {product ? (
                            <>
                                <Row>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={9} className="text-center">
                                                <Carousel
                                                    autoplay
                                                    autoplaySpeed={5000}
                                                    pauseOnHover
                                                >
                                                    <div>
                                                        <Image src={PlaceHolderImg1} alt="Img 1" />
                                                    </div>
                                                    <div>
                                                        <Image src={PlaceHolderImg2} alt="Img 2" />
                                                    </div>
                                                </Carousel>
                                            </Col>
                                            <Col
                                                span={15}
                                                className="bordered"
                                                style={{ padding: 25 }}
                                            >
                                                <Row>
                                                    <Col span={24}>
                                                        <h2>{product["name"]}</h2>
                                                        <h3 style={{ color: "#02937F" }}>
                                                            {product["comments"].length > 0 ? (
                                                                <>
                                                                    {averageRating.map(
                                                                        (rate, idx) =>
                                                                            rate ? (
                                                                                <StarFilled
                                                                                    key={idx}
                                                                                    color="#02937F"
                                                                                />
                                                                            ) : (
                                                                                <StarOutlined
                                                                                    key={idx}
                                                                                />
                                                                            )
                                                                    )}{" "}
                                                                    - Dựa trên{" "}
                                                                    {product["comments"].length}{" "}
                                                                    đánh giá
                                                                </>
                                                            ) : (
                                                                "Chưa có đánh giá nào cho sản phẩm này"
                                                            )}
                                                        </h3>
                                                        <h2>
                                                            {Boolean(product["isDiscount"]) && (
                                                                <span>
                                                                    <span>
                                                                        {formatVietnameseCurrency(
                                                                            calcDiscountPrice(
                                                                                product["price"],
                                                                                product[
                                                                                    "discountPercent"
                                                                                ]
                                                                            )
                                                                        )}
                                                                    </span>
                                                                    {" - "}
                                                                </span>
                                                            )}
                                                            <span
                                                                className={`${
                                                                    product["isDiscount"] &&
                                                                    "original-price"
                                                                }`}
                                                            >
                                                                {formatVietnameseCurrency(
                                                                    product["price"]
                                                                )}
                                                            </span>
                                                        </h2>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24}>
                                                        <label className="text-bold">
                                                            Số lượng:
                                                        </label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={12}>
                                                        <Input
                                                            prefix={
                                                                <Button
                                                                    onClick={handleMinusQuantity}
                                                                    icon={<MinusOutlined />}
                                                                />
                                                            }
                                                            suffix={
                                                                <Button
                                                                    onClick={handlePlusQuantity}
                                                                    icon={<PlusOutlined />}
                                                                />
                                                            }
                                                            min={1}
                                                            className="text-center"
                                                            bordered={false}
                                                            value={quantity}
                                                            onKeyPress={handleInputQuantity}
                                                            onBlur={handleBlurQuantity}
                                                            onFocus={handleFocusQuantityInput}
                                                            onChange={handleChangeQuantity}
                                                        />
                                                    </Col>
                                                    <Col span={12}>
                                                        <Button
                                                            block
                                                            size="large"
                                                            style={{
                                                                backgroundColor: "#02937F",
                                                                color: "white",
                                                            }}
                                                            onClick={handleAddToCart}
                                                            disabled={disableAddToCart}
                                                        >
                                                            THÊM VÀO GIỎ HÀNG
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: 100 }}>
                                                    <Col span={24}>
                                                        <Tabs defaultActiveKey="overview">
                                                            <Tabs.TabPane
                                                                tab="Tổng quan"
                                                                key="overview"
                                                                style={tabPaneStyle}
                                                            >
                                                                <h3>
                                                                    Xuất xứ: {product["origin"]}
                                                                </h3>
                                                                <Divider orientation="left">
                                                                    Mô tả
                                                                </Divider>
                                                                <p>{product["description"]}</p>
                                                                <Divider orientation="left">
                                                                    Đặc điểm
                                                                </Divider>
                                                                <ul>
                                                                    {product["characteristic"] &&
                                                                        product["characteristic"]
                                                                            .trim()
                                                                            .split("-")
                                                                            .slice(1)
                                                                            .map((ch, idx) => (
                                                                                <li key={idx}>
                                                                                    {ch}
                                                                                </li>
                                                                            ))}
                                                                </ul>
                                                            </Tabs.TabPane>
                                                            <Tabs.TabPane
                                                                tab="Hướng dẫn sử dụng"
                                                                key="guide"
                                                                style={tabPaneStyle}
                                                            >
                                                                <p>{product["guide"]}</p>
                                                                <Divider orientation="left">
                                                                    Bảo quản
                                                                </Divider>
                                                                <p>{product["preservation"]}</p>
                                                            </Tabs.TabPane>
                                                            <Tabs.TabPane
                                                                tab="Thành phần"
                                                                key="ingredient"
                                                                style={tabPaneStyle}
                                                            >
                                                                <Divider orientation="left">
                                                                    Các thành phần trong sản phẩm
                                                                </Divider>
                                                                <ol>
                                                                    {product["ingredient"] &&
                                                                        product["ingredient"]
                                                                            .split(",")
                                                                            .map(
                                                                                (
                                                                                    ingredient,
                                                                                    idx
                                                                                ) => (
                                                                                    <li key={idx}>
                                                                                        {ingredient}
                                                                                    </li>
                                                                                )
                                                                            )}
                                                                </ol>
                                                            </Tabs.TabPane>
                                                        </Tabs>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Divider style={{ fontSize: 24 }}>
                                                    Bạn có thể thích
                                                </Divider>
                                                <Row gutter={15}>
                                                    {products
                                                        .filter(
                                                            (p) =>
                                                                p["categoryId"] ==
                                                                    product["idCategory"] &&
                                                                p["id"] != product["id"]
                                                        )
                                                        .slice(0, 4)
                                                        .map((p) => (
                                                            <Col key={p["id"]} span={6}>
                                                                <ProductCard product={p} />
                                                            </Col>
                                                        ))}
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className="mt-25">
                                            <Col
                                                span={24}
                                                className="bordered"
                                                style={{ padding: 25 }}
                                            >
                                                <Divider style={{ fontSize: 24 }}>
                                                    Đánh giá của khách hàng
                                                </Divider>
                                                <h3 style={{ color: "#02937F" }}>
                                                    {product["comments"].length > 0 ? (
                                                        <>
                                                            {averageRating.map((rate, idx) =>
                                                                rate ? (
                                                                    <StarFilled
                                                                        key={idx}
                                                                        color="#02937F"
                                                                    />
                                                                ) : (
                                                                    <StarOutlined key={idx} />
                                                                )
                                                            )}{" "}
                                                            - Dựa trên {product["comments"].length}{" "}
                                                            đánh giá
                                                        </>
                                                    ) : (
                                                        "Chưa có đánh giá nào cho sản phẩm này"
                                                    )}
                                                </h3>
                                                {/* Placeholder for user comment */}
                                                {product["comments"].map((comment, idx) => {
                                                    const stars = [0, 0, 0, 0, 0].fill(
                                                        1,
                                                        0,
                                                        comment["rate"]
                                                    );
                                                    return (
                                                        <Comment
                                                            key={idx}
                                                            author={comment["fullName"]}
                                                            avatar={
                                                                <Avatar
                                                                    src={faker.image.avatar()}
                                                                    alt="avatar"
                                                                />
                                                            }
                                                            content={
                                                                <>
                                                                    <span>
                                                                        {stars.map((star, idx) =>
                                                                            star ? (
                                                                                <StarFilled
                                                                                    key={idx}
                                                                                    className="theme-color"
                                                                                />
                                                                            ) : (
                                                                                <StarOutlined
                                                                                    key={idx}
                                                                                />
                                                                            )
                                                                        )}
                                                                    </span>
                                                                    <p>{comment["content"]}</p>
                                                                </>
                                                            }
                                                            datetime={moment(
                                                                comment["createdDate"]
                                                            ).format("YYYY-MM-DD HH:mm:ss")}
                                                        />
                                                    );
                                                })}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <Alert type="warning" message="Sản phẩm bạn đang tìm không tồn tại" />
                        )}
                    </Skeleton>
                </Col>
            </Row>
        </>
    );
}

export default ProductDetail;

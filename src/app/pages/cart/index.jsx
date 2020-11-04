import { Alert, Button, Card, Col, Divider, Input, PageHeader, Row, Table, Tooltip } from "antd";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaceHolderImg from "../../assets/img/product-placeholder.png";
import { PlusOutlined, MinusOutlined, DeleteFilled, QuestionOutlined } from "@ant-design/icons";
import { changeProductQuantity, removeProduct } from "../../redux/slices/cart";
import { calcDiscountPrice, formatVietnameseCurrency } from "../../utils/common/common";
import { openModal as openLoginModal } from "../../redux/slices/login";

function Cart(props) {
    const { products } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Giỏ hàng";
    }, []);

    const originalPrice = useMemo(() => {
        let price = 0;
        products.forEach((product) => {
            price += product["price"] * parseInt(product["cartQuantity"]);
        });
        return price;
    }, [products]);

    const discountPrice = useMemo(() => {
        let price = 0;
        products.forEach((product) => {
            price +=
                (product["isDiscount"]
                    ? calcDiscountPrice(product["price"], product["discountPercent"])
                    : product["price"]) * parseInt(product["cartQuantity"]);
        });
        return price;
    }, [products]);

    const plusQuantity = (product) => {
        const currentQuantity = parseInt(product["cartQuantity"]);
        dispatch(changeProductQuantity(product, currentQuantity + 1));
    };

    const minusQuantity = (product) => {
        const currentQuantity = parseInt(product["cartQuantity"]);
        if (currentQuantity > 1) {
            dispatch(changeProductQuantity(product, currentQuantity - 1));
        }
    };

    const removeProductCart = (product) => {
        dispatch(removeProduct(product));
    };

    const handleOpenLoginModal = (key) => {
        dispatch(openLoginModal(key));
    };

    const columns = [
        {
            title: "Ảnh",
            key: "images",
            dataIndex: "images",
            render: (images) => (
                <img
                    alt="Product img"
                    style={{ width: 100, height: 100 }}
                    // src={images.length > 0 ? images[0]["name"] : PlaceHolderImg}
                    src={PlaceHolderImg}
                />
            ),
        },
        {
            title: "Sản phẩm",
            key: "product",
            render: (text, record, index) => (
                <>
                    <h4>{record["name"]}</h4>
                    <p className="mt-15">
                        {Boolean(record["isDiscount"]) && (
                            <span>
                                <span className="text-bold">
                                    {formatVietnameseCurrency(
                                        calcDiscountPrice(
                                            record["price"],
                                            record["discountPercent"]
                                        )
                                    )}
                                </span>
                                {" - "}
                            </span>
                        )}
                        <span className={`${record["isDiscount"] && "original-price"} text-bold`}>
                            {formatVietnameseCurrency(record["price"])}
                        </span>
                    </p>
                    <p className="mt-10">
                        <label>Số lượng:</label>
                        <Input
                            prefix={
                                <Button
                                    onClick={() => minusQuantity(record)}
                                    icon={<MinusOutlined />}
                                />
                            }
                            suffix={
                                <Button
                                    onClick={() => plusQuantity(record)}
                                    icon={<PlusOutlined />}
                                />
                            }
                            min={1}
                            className="text-center"
                            style={{ width: 125 }}
                            bordered={false}
                            value={record["cartQuantity"]}
                        />
                    </p>
                    <p>
                        <Button size="small" onClick={() => removeProductCart(record)} type="link">
                            Bỏ khỏi giỏ hàng
                        </Button>
                    </p>
                </>
            ),
        },
    ];

    return (
        <>
            <Row>
                <Col span={16} offset={4}>
                    <Row>
                        <Col span={24}>
                            <PageHeader ghost={false} title="Giỏ hàng của bạn" />
                            <Alert
                                type="success"
                                message={
                                    <span>
                                        Đã có tài khoản?{" "}
                                        <Button
                                            onClick={() => handleOpenLoginModal("login")}
                                            type="link"
                                        >
                                            Đăng nhập
                                        </Button>
                                    </span>
                                }
                            />
                        </Col>
                    </Row>
                    <Row className="mt-25" gutter={25}>
                        <Col span={14}>
                            <Table dataSource={products} columns={columns} />
                        </Col>
                        <Col span={10}>
                            <Row style={{ borderBottom: "2px solid black" }}>
                                <Col span={24}>
                                    <h3>
                                        <b>Thông tin thanh toán</b>
                                    </h3>
                                </Col>
                            </Row>
                            <Row className="mt-25">
                                <Col span={16}>
                                    <h4>Tổng giá trị</h4>
                                </Col>
                                <Col span={8} className="text-red text-bold text-right">
                                    {formatVietnameseCurrency(originalPrice)}
                                </Col>
                            </Row>
                            <Row className="mt-10">
                                <Col span={16}>
                                    <h4>Khuyến mãi</h4>
                                </Col>
                                <Col span={8} className="text-red text-bold text-right">
                                    {formatVietnameseCurrency(originalPrice - discountPrice)}
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col span={16}>
                                    <h4>
                                        THÀNH TIỀN{" "}
                                        <Tooltip title="Thuế giá trị gia tăng sẽ được áp dụng khi thanh toán hoá đơn">
                                            <Button
                                                size="small"
                                                shape="circle"
                                                icon={<QuestionOutlined />}
                                            />
                                        </Tooltip>
                                    </h4>
                                </Col>
                                <Col span={8} className="text-red text-bold text-right">
                                    {formatVietnameseCurrency(discountPrice)}
                                </Col>
                            </Row>
                            <Row className="mt-20">
                                <Col span={24}>
                                    <Button block className="bg-green" size="large">
                                        XÁC NHẬN ĐƠN HÀNG
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Cart;

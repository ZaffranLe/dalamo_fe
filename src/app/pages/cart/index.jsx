import { Button, Col, Input, PageHeader, Row, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaceHolderImg from "../../assets/img/product-placeholder.png";
import { PlusOutlined, MinusOutlined, DeleteFilled } from "@ant-design/icons";
import { changeProductQuantity, removeProduct } from "../../redux/slices/cart";
import { calcDiscountPrice, formatVietnameseCurrency } from "../../utils/common/common";

function Cart(props) {
    const { products } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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

    const columns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index + 1,
        },
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
            title: "Tên sản phẩm",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Đơn giá",
            key: "price",
            render: (text, record) => (
                <span className="text-red text-bold">
                    {formatVietnameseCurrency(
                        record["isDiscount"]
                            ? calcDiscountPrice(record["price"], record["discountPercent"])
                            : record["price"]
                    )}
                </span>
            ),
        },
        {
            title: "Số lượng",
            key: "quantity",
            render: (text, record) => (
                <>
                    <Input
                        prefix={
                            <Button
                                onClick={() => minusQuantity(record)}
                                icon={<MinusOutlined />}
                            />
                        }
                        suffix={
                            <Button onClick={() => plusQuantity(record)} icon={<PlusOutlined />} />
                        }
                        min={1}
                        className="text-center"
                        style={{ width: 150 }}
                        bordered={false}
                        value={record["cartQuantity"]}
                    />
                </>
            ),
        },
        {
            title: "Thành tiền",
            key: "totalPrice",
            render: (text, record) => {return (
                <span className="text-bold text-red">
                    {formatVietnameseCurrency(
                        parseInt(record["cardQuantity"]) * record["isDiscount"]
                            ? calcDiscountPrice(record["price"], record["discountPercent"])
                            : record["price"]
                    )}
                </span>
            }),
        },
        {
            title: "",
            key: "action",
            render: (text, record) => (
                <Button danger onClick={() => removeProductCart(record)} icon={<DeleteFilled />} />
            ),
        },
    ];

    return (
        <>
            <Row>
                <Col span={16} offset={4}>
                    <Row>
                        <Col span={24}>
                            <PageHeader ghost={false} title="Giỏ hàng" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table dataSource={products} columns={columns} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Cart;

import { Button, Col, Image, Input, Modal, Row, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDetailReceipt } from "../../../redux/slices/receipt";
import { formatVietnameseCurrency } from "../../../utils/common/common";
import moment from "moment";

function DetailModal(props) {
    const { detailReceipt } = useSelector((state) => state.receipt);
    const dispatch = useDispatch();

    const priceStyle = {
        fontWeight: "bold",
        color: "red",
    };

    const columns = [
        {
            title: "Ảnh",
            key: "image",
            render: (text, record) => (
                <Image src={`${record["imgUrl"]}/tr:h-150,w-150`} alt="product img" />
            ),
        },
        {
            title: "Sẩn phẩm",
            key: "product",
            dataIndex: "name",
        },
        {
            title: "Số lượng",
            key: "quantity",
            dataIndex: "quantity",
        },
        {
            title: "Tổng tiền",
            key: "price",
            render: (text, record) => (
                <span style={priceStyle}>{formatVietnameseCurrency(record["price"])}</span>
            ),
        },
    ];

    return (
        <Modal
            width="70%"
            visible={detailReceipt}
            title="Thông tin chi tiết hoá đơn"
            footer={
                <Button onClick={() => dispatch(setDetailReceipt(null))} type="default">
                    Đóng
                </Button>
            }
        >
            {detailReceipt && (
                <>
                    <Row>
                        <Col span={24}>
                            <Row gutter={10}>
                                <Col span={8}>
                                    <label>Khách hàng: </label>
                                    <Input readOnly value={detailReceipt["name"]} />
                                </Col>
                                <Col span={8}>
                                    <label>SĐT: </label>
                                    <Input readOnly value={detailReceipt["phone"]} />
                                </Col>
                                <Col span={8}>
                                    <label>Địa chỉ giao hàng: </label>
                                    <Input readOnly value={detailReceipt["address"]} />
                                </Col>
                            </Row>
                            <Row className="mt-10" gutter={10}>
                                <Col span={8}>
                                    <label>Tổng tiền: </label>
                                    <span style={priceStyle}>
                                        {formatVietnameseCurrency(detailReceipt["totalPrice"])}
                                    </span>
                                </Col>
                                <Col span={8}>
                                    <label>Ngày lập đơn hàng: </label>
                                    <span>
                                        {moment(detailReceipt["createdDate"]).format(
                                            "HH:mm DD/MM/YYYY"
                                        )}
                                    </span>
                                </Col>
                                <Col span={8}>
                                    <label>Trạng thái: </label>
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            color: detailReceipt["statusColor"],
                                        }}
                                    >
                                        {detailReceipt["statusDescription"]}
                                    </span>
                                </Col>
                            </Row>
                            {detailReceipt["note"] && (
                                <Row className="mt-10">
                                    <Col span={24}>
                                        <label>Ghi chú:</label>
                                        <Input.TextArea value={detailReceipt["note"]} />
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                    <Row className="mt-10">
                        <Col span={24}>
                            <h3>Danh sách sản phẩm</h3>
                        </Col>
                    </Row>
                    <Row className="mt-10">
                        <Col span={24}>
                            <Table columns={columns} dataSource={detailReceipt["detail"]} />
                        </Col>
                    </Row>
                </>
            )}
        </Modal>
    );
}

export default DetailModal;

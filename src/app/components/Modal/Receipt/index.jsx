import React, { useEffect } from "react";
import { Modal, Button, Alert, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { formatVietnameseCurrency } from "../../../utils/common/common";
import { fetchReceipts } from "../../../redux/slices/receipt";
import moment from "moment";

function ListReceiptModal({open, onClose}) {
    const { receipts, isLoading } = useSelector((state) => state.receipt);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchReceipts(receipts));
    }, [])

    const columns = [
        {
            title: "Hoá đơn",
            key: "receipt",
            render: (text, record) => "OR_" + String.format("%05d", record["id"]),
        },
        {
            title: "Khách hàng",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Số điện thoại",
            key: "phone",
            dataIndex: "phone",
        },
        {
            title: "Địa chỉ",
            key: "address",
            dataIndex: "address",
        },
        {
            title: "Ghi chú",
            key: "note",
            dataIndex: "note",
        },
        {
            title: "Ngày đặt hàng",
            key: "createdDate",
            render: (text, record) => moment(record["createdDate"]).format("HH:mm DD/MM/YYYY"),
        },
        {
            title: "Tổng tiền",
            key: "totalPrice",
            render: (text, record) => formatVietnameseCurrency(parseInt(record["totalPrice"])),
        },
        {
            title: "#",
            key: "actions",
            render: (text, record) => <Button type="primary" icon={<EyeOutlined />} />,
        },
    ];

    return (
        <Modal
            width="70%"
            title="So sánh sản phẩm"
            visible={open}
            footer={[
                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
            closable={false}
        >
            {receipts.length > 0 ? (
                <Table dataSource={receipts} columns={columns} />
            ) : (
                <Alert
                    description="Bạn chưa có hoá đơn nào để hiển thị."
                    style={{ textAlign: "center" }}
                    type="warning"
                />
            )}
        </Modal>
    );
}

export default ListReceiptModal;

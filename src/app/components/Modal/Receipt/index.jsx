import React, { useEffect } from "react";
import { Modal, Button, Alert, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { formatVietnameseCurrency } from "../../../utils/common/common";
import { fetchReceipts } from "../../../redux/slices/cart";
import moment from "moment";
import { fetchDetailReceipt } from "../../../redux/slices/receipt";

function ListReceiptModal({ open, onClose }) {
    const { receipts, isLoading, isSucceed } = useSelector((state) => state.cart);
    const { isLoading: loadingDetailReceipt } = useSelector((state) => state.receipt);
    const { loggedIn } = useSelector((state) => state.login);
    const user = window.userInfo;

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(fetchReceipts(receipts));
        }
    }, []);

    useEffect(() => {
        if (user || loggedIn) {
            dispatch(fetchReceipts(receipts));
        }
    }, [isSucceed, loggedIn]);

    const columns = [
        {
            title: "Hoá đơn",
            key: "receipt",
            render: (text, record) => `OR_${record["id"]}`,
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
            title: "Trạng thái",
            key: "statusDescription",
            render: (text, record) => (
                <span style={{ color: record["statusColor"], fontWeight: "bold" }}>
                    {record["statusDescription"]}
                </span>
            ),
        },
        {
            title: "Tổng tiền",
            key: "totalPrice",
            render: (text, record) => (
                <span style={{ fontWeight: "bold", color: "red" }}>
                    {formatVietnameseCurrency(parseInt(record["totalPrice"]))}
                </span>
            ),
        },
        {
            title: "#",
            key: "actions",
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => dispatch(fetchDetailReceipt(record["id"]))}
                    icon={<EyeOutlined />}
                    loading={loadingDetailReceipt}
                />
            ),
        },
    ];

    return (
        <Modal
            width="70%"
            title="Danh sách hoá đơn mua hàng"
            visible={open}
            footer={[
                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
            closable={false}
        >
            {receipts.length > 0 ? (
                <Table loading={isLoading} rowKey="id" dataSource={receipts} columns={columns} />
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

import React, { useEffect } from "react";
import { Modal, Button, Alert, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slices/compare";
import { formatVietnameseCurrency } from "../../../utils/common/common";

function CompareModal(props) {
    const { modalState, products } = useSelector((state) => state.compare);
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            name: "name",
            key: "name",
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            name: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Nhãn hiệu",
            dataIndex: "brand",
            name: "brand",
            key: "brand",
        },
        {
            title: "Xuất xứ",
            dataIndex: "origin",
            name: "origin",
            key: "origin",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            name: "description",
            key: "description",
        },
        {
            title: "Đặc điểm",
            dataIndex: "characteristic",
            name: "characteristic",
            key: "characteristic",
        },
        {
            title: "Thành phần",
            dataIndex: "ingredient",
            name: "ingredient",
            key: "ingredient",
        },
    ];

    return (
        <Modal
            width="70%"
            title="So sánh sản phẩm"
            visible={modalState}
            footer={[
                <Button key="close" onClick={handleCloseModal}>
                    Đóng
                </Button>,
            ]}
            closable={false}
        >
            {products.length > 0 ? (
                <Table dataSource={products} columns={columns} />
            ) : (
                <Alert
                    description="Chưa có sản phẩm nào để tiến hành so sánh"
                    style={{ textAlign: "center" }}
                    type="warning"
                />
            )}
        </Modal>
    );
}

export default CompareModal;

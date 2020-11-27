import React from "react";
import { Modal, Button, Form, Input, Space } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserModal, updateUserInfo } from "../../../redux/slices/user";
import { SaveFilled } from "@ant-design/icons";

function UserModal(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, userModal } = useSelector((state) => state.user);

    const [form] = Form.useForm();
    const initUser = { ...window.userInfo, newPassword: "" };

    const handleUpdateUser = async () => {
        const values = await form.validateFields();
        const newUser = {
            ...initUser,
            ...values,
        };
        dispatch(updateUserInfo(newUser, history));
    };

    const handlePhoneKeyPress = (e) => {
        if (isNaN(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <Modal
            visible={userModal}
            footer={
                <Space>
                    <Button loading={isLoading} onClick={handleUpdateUser} type="primary">
                        <SaveFilled /> Lưu
                    </Button>
                    <Button onClick={() => dispatch(setUserModal(false))}>Đóng</Button>
                </Space>
            }
            title="Thông tin tài khoản"
            width="50%"
        >
            <Form
                form={form}
                initialValues={initUser}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: "Bạn cần nhập tên của bản thân",
                        },
                    ]}
                    label="Họ tên"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Xác nhận mật khẩu"
                    dependencies={["newPassword"]}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue("newPassowrd") === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    "Mật khẩu không trùng khớp."
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="SĐT"
                >
                    <Input onKeyPress={handlePhoneKeyPress} />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: "Email sai định dạng",
                        },
                    ]}
                    label="Email"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default UserModal;

import React, { useEffect } from "react";
import { Modal, Row, Col, Button, Alert, Form, Input, Tabs, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, setDefaultActive } from "../../../redux/slices/login";
import SkinCare from "../../../assets/img/skin-care.jpg";

function LoginModal(props) {
    const { modalState, defaultActive } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleChangeTab = (key) => {
        dispatch(setDefaultActive(key));
    }

    return (
        <Modal
            onCancel={handleCloseModal}
            width="50%"
            visible={modalState}
            footer={null}
            closable={false}
            bodyStyle={{ padding: 0 }}
        >
            <Row>
                <Col span={12}>
                    <Tabs
                        tabBarStyle={{ marginLeft: 15 }}
                        activeKey={defaultActive}
                        style={{ height: "100%" }}
                        onChange={handleChangeTab}
                    >
                        <Tabs.TabPane tab="Đăng nhập" key="login" style={{ marginTop: "23%" }}>
                            <Form wrapperCol={{ span: 16, offset: 4 }}>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Không được để trống email",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                                <Form.Item name="password" required>
                                    <Input.Password placeholder="Mật khẩu" />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 9, span: 4 }}>
                                    <Button type="primary">Đăng nhập</Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Đăng ký" key="register" style={{ marginTop: "11%" }}>
                            <Form wrapperCol={{ span: 16, offset: 4 }}>
                                <Form.Item name="fullName" required>
                                    <Input placeholder="Họ tên" />
                                </Form.Item>
                                <Form.Item name="email" required>
                                    <Input placeholder="Email" />
                                </Form.Item>
                                <Form.Item name="password" required>
                                    <Input.Password placeholder="Mật khẩu" required />
                                </Form.Item>
                                <Form.Item name="confirmPassword" required>
                                    <Input.Password placeholder="Xác nhận mật khẩu" required />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 9, span: 4 }}>
                                    <Button type="primary">Đăng nhập</Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
                <Col span={12} style={{ textAlign: "center", padding: 25 }}>
                    <Popover
                        content={
                            <a
                                href="http://www.freepik.com"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Designed by stories / Freepik
                            </a>
                        }
                        placement="bottom"
                    >
                        <img src={SkinCare} alt="login-img" style={{ width: "100%" }} />
                    </Popover>
                </Col>
            </Row>
        </Modal>
    );
}

export default LoginModal;

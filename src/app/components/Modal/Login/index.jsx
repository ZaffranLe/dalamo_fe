import React, { useEffect } from "react";
import { Modal, Row, Col, Button, Checkbox, Form, Input, Tabs, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, setDefaultActive, register, login } from "../../../redux/slices/login";
import SkinCare from "../../../assets/img/skin-care.jpg";
import { toast } from "react-toastify";

function LoginModal(props) {
    const { modalState, defaultActive } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleChangeTab = (key) => {
        dispatch(setDefaultActive(key));
    };

    const handleRegister = async () => {
        try {
            const values = await registerForm.validateFields();
            dispatch(register({ ...values }));
        } catch (e) {
            toast.error("Đăng ký thất bại! Vui lòng thử lại sau.");
            console.error(e);
        }
    };

    const handleLogin = async () => {
        try {
            const values = await loginForm.validateFields();
            dispatch(login({ ...values }));
        } catch (e) {
            toast.error("Đăng nhập thất bại! Vui lòng thử lại sau.");
            console.error(e);
        }
    };

    const [registerForm] = Form.useForm();
    const [loginForm] = Form.useForm();

    const initRegisterForm = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const initLoginForm = {
        email: "",
        password: "",
        remember: true,
    };

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
                            <Form form={loginForm} initialValues={initLoginForm} wrapperCol={{ span: 16, offset: 4 }}>
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
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Không được để trống mật khẩu",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Mật khẩu" />
                                </Form.Item>
                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 9, span: 4 }}>
                                    <Button onClick={handleLogin} type="primary">Đăng nhập</Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Đăng ký" key="register" style={{ marginTop: "11%" }}>
                            <Form
                                form={registerForm}
                                initialValues={initRegisterForm}
                                wrapperCol={{ span: 16, offset: 4 }}
                            >
                                <Form.Item
                                    name="fullName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập họ tên của bạn.",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Họ tên" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập email của bạn.",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mật khẩu.",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Mật khẩu" />
                                </Form.Item>
                                <Form.Item
                                    name="confirmPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng xác nhận mật khẩu.",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject(
                                                    "Mật khẩu không trùng khớp! Vui lòng kiểm tra lại"
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Xác nhận mật khẩu" />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 9, span: 4 }}>
                                    <Button type="primary" onClick={handleRegister}>
                                        Đăng ký
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
                <Col span={12} style={{ textAlign: "center", padding: 25 }}>
                    <Popover
                        content={
                            <a href="http://www.freepik.com" rel="noopener noreferrer" target="_blank">
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

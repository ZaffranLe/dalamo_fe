import React from "react";
import { Col, Layout, Menu, Row } from "antd";
import Logo from "../../../assets/img/logo.png";
import { Link } from "react-router-dom";

function Footer(props) {
    return (
        <Layout.Footer style={{ textAlign: "center", backgroundColor: "white", borderTop: "5px solid #668866" }}>
            <Row>
                <Col offset={4} span={4}>
                    <div className="logo">
                        <img src={Logo} alt="Logo SMMGate" style={{ width: "220px", marginBottom: "12px" }} />
                    </div>
                    © SMMGate - All rights reversed
                </Col>
                <Col span={4}>
                    <Menu>
                        <Menu.Item><Link to={`/about-us`}>Về chúng tôi</Link></Menu.Item>
                        <Menu.Item>Thông tin liên lạc</Menu.Item>
                        <Menu.Item>Theo dõi đơn hàng</Menu.Item>
                    </Menu>
                </Col>
                <Col span={4}>
                    <Menu>
                        <Menu.Item>FAQs</Menu.Item>
                        <Menu.Item>Hỗ trợ</Menu.Item>
                    </Menu>
                </Col>
                <Col span={4}>
                    <Menu>
                        <Menu.Item>Facebook</Menu.Item>
                        <Menu.Item>Instagram</Menu.Item>
                        <Menu.Item>Youtube</Menu.Item>
                        <Menu.Item>Twitter</Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </Layout.Footer>
    );
}

export default Footer;

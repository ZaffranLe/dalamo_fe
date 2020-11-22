import { Layout, Button } from "antd";
import React, { useState, useEffect } from "react";
import UserHeader from "./Header/User";
import UserFooter from "./Footer/User";
import "./Layout.scss";
import { FacebookOutlined, ArrowUpOutlined } from "@ant-design/icons";

function UserLayout({children, history}) {
    return (
        <Layout className="wrapper">
            <Layout>
                <UserHeader history={history} />
                <Layout.Content className="wrapper-content bg-white">
                    {/* <Bread /> */}
                    <div id="main-container" className="main-content">
                        {children}
                    </div>
                </Layout.Content>
                <UserFooter />
                <Button
                    style={{ right: 25, bottom: 25 }}
                    className="layout-fixed bg-facebook"
                    shape="circle"
                    size="large"
                    icon={<FacebookOutlined />}
                />
                <Button
                    style={{ right: 25, bottom: 25 }}
                    className="layout-fixed bg-orange-gradient"
                    shape="circle"
                    size="large"
                    href="#main-container"
                >
                    <ArrowUpOutlined />
                </Button>
                <Button
                    style={{ right: 25, bottom: "70%" }}
                    className="layout-fixed bg-facebook"
                    shape="circle"
                    size="large"
                    icon={<FacebookOutlined />}
                />
            </Layout>
        </Layout>
    );
}

export default UserLayout;

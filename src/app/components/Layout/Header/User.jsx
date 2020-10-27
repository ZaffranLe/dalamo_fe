import React, { useEffect } from "react";
import {
    ShoppingOutlined,
    ShoppingTwoTone,
    SearchOutlined,
    UserOutlined,
    HomeOutlined,
    RetweetOutlined,
    UnorderedListOutlined,
    InboxOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar, Tooltip, Badge, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import Logo from "../../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { openModal as openCompareModal } from "../../../redux/slices/compare";
import { openModal as openLoginModal } from "../../../redux/slices/login";
import { fetchCategories } from "../../../redux/slices/category";
import CompareModal from "../../Modal/Compare";
import LoginModal from "../../Modal/Login";

function UserHeader(props) {
    const { user } = props;
    const dispatch = useDispatch();
    const productsCompare = useSelector((state) => state.compare.products);
    const productsCart = useSelector((state) => state.cart.products);
    const { categories, isLoading: isLoadingCategory } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategories(categories));
    }, []);

    const handleOpenCompareModal = () => {
        dispatch(openCompareModal());
    };

    const handleOpenLoginModal = (key) => {
        dispatch(openLoginModal(key));
    };

    return (
        <Layout.Header className="header fixed">
            <div className="logo">
                <img src={Logo} alt="Logo dalamo" style={{ maxWidth: "100%" }} />
            </div>
            <Menu style={{ width: "100%" }} key="menu" mode="horizontal" selectable={false}>
                <Menu.SubMenu
                    className="category-menu category-menu__bg--green"
                    key="Category"
                    title="Danh mục sản phẩm"
                    icon={<UnorderedListOutlined />}
                >
                    <Skeleton loading={isLoadingCategory}>
                        {categories.map((category, idx) => (
                            <Menu.Item key={category["id"]}>{category["name"]}</Menu.Item>
                        ))}
                    </Skeleton>
                </Menu.SubMenu>
                <Menu.Item key="HomePage" icon={<HomeOutlined />}>
                    <Link to="/">Trang chủ</Link>
                </Menu.Item>
                <Menu.Item key="Product" icon={<InboxOutlined />}>
                    <Link to="/product">Sản phẩm</Link>
                </Menu.Item>
            </Menu>
            <Menu key="user" mode="horizontal" selectable={false}>
                <Menu.Item
                    key="Cart"
                    icon={
                        <Tooltip title={`Giỏ hàng có ${productsCart.length} sản phẩm`}>
                            <Badge count={productsCart.length}>
                                <ShoppingTwoTone
                                    twoToneColor="#6da9f7"
                                    className="icon--non-margin"
                                />
                            </Badge>
                        </Tooltip>
                    }
                />
                <Menu.Item
                    onClick={handleOpenCompareModal}
                    key="Compare"
                    icon={
                        <Tooltip title={`Đang so sánh ${productsCompare.length} sản phẩm`}>
                            <Badge count={productsCompare.length}>
                                <RetweetOutlined className="icon--non-margin" />
                            </Badge>
                        </Tooltip>
                    }
                />
                {user ? (
                    <Menu.SubMenu
                        title={
                            <>
                                <span style={{ marginRight: 4 }}>Xin chào </span>
                                <span className="username">{user["name"]}</span>
                                {/* TODO: Username */}
                                <Avatar style={{ marginLeft: 8 }} src={Logo} />
                            </>
                        }
                    >
                        <Menu.Item key="Profile">Tài khoản của tôi</Menu.Item>
                        <Menu.Item key="Orders">Danh sách đơn hàng</Menu.Item>
                        <Menu.Item key="SignOut">Đăng xuất</Menu.Item>
                    </Menu.SubMenu>
                ) : (
                    <Menu.SubMenu icon={<UserOutlined className="icon--non-margin" />}>
                        <Menu.Item key="Login" onClick={() => handleOpenLoginModal("login")}>
                            Đăng nhập
                        </Menu.Item>
                        <Menu.Item key="Register" onClick={() => handleOpenLoginModal("register")}>
                            Đăng ký
                        </Menu.Item>
                    </Menu.SubMenu>
                )}
            </Menu>
            <CompareModal />
            <LoginModal />
        </Layout.Header>
    );
}

export default UserHeader;

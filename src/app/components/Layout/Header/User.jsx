import React, { useEffect } from "react";
import {
    ShoppingTwoTone,
    DownOutlined,
    UserOutlined,
    HomeOutlined,
    RetweetOutlined,
    UnorderedListOutlined,
    InboxOutlined,
    DingdingOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar, Tooltip, Badge, Skeleton, Input } from "antd";
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
            <Menu key="menu" id="header-menu" mode="horizontal" selectable={false}>
                <Menu.SubMenu
                    className="padding-menu padding-menu__bg--green"
                    key="Category"
                    title={
                        <>
                            <span>
                                Danh mục sản phẩm <DownOutlined />
                            </span>
                        </>
                    }
                    icon={<UnorderedListOutlined />}
                >
                    {categories.map((category, idx) => (
                        <Menu.Item key={category["id"]}>{category["name"]}</Menu.Item>
                    ))}
                </Menu.SubMenu>
                <Menu.Item className="padding-menu" key="HomePage" icon={<HomeOutlined />}>
                    <Link to="/">Trang chủ</Link>
                </Menu.Item>
                <Menu.Item className="padding-menu" key="Product" icon={<InboxOutlined />}>
                    <Link to="/product">Sản phẩm</Link>
                </Menu.Item>
                <Menu.SubMenu
                    className="padding-menu"
                    title={
                        <>
                            <span>
                                Tìm theo hãng <DownOutlined />
                            </span>
                        </>
                    }
                    key="Brand"
                    icon={<DingdingOutlined />}
                >
                    <Menu.Item>Abc</Menu.Item>
                </Menu.SubMenu>

                <Menu.Item className="padding-menu">
                    <Input placeholder="Tìm kiếm..." suffix={<SearchOutlined />} />
                </Menu.Item>
                {user ? (
                    <Menu.SubMenu
                        className="float-right padding-menu"
                        title={
                            <>
                                <span style={{ marginRight: 4 }}>Xin chào </span>
                                <span className="username">{user["name"]}</span>
                                <Avatar style={{ marginLeft: 8 }} src={Logo} />
                            </>
                        }
                    >
                        <Menu.Item key="Profile">Tài khoản của tôi</Menu.Item>
                        <Menu.Item key="Orders">Danh sách đơn hàng</Menu.Item>
                        <Menu.Item key="SignOut">Đăng xuất</Menu.Item>
                    </Menu.SubMenu>
                ) : (
                    <Menu.SubMenu
                        className="float-right padding-menu"
                        icon={<UserOutlined className="icon--non-margin" />}
                    >
                        <Menu.Item key="Login" onClick={() => handleOpenLoginModal("login")}>
                            Đăng nhập
                        </Menu.Item>
                        <Menu.Item key="Register" onClick={() => handleOpenLoginModal("register")}>
                            Đăng ký
                        </Menu.Item>
                    </Menu.SubMenu>
                )}
                <Menu.Item className="float-right padding-menu" key="Cart">
                    <Link to="/cart">
                        <Tooltip title={`Giỏ hàng có ${productsCart.length} sản phẩm`}>
                            <Badge count={productsCart.length}>
                                <ShoppingTwoTone
                                    twoToneColor="#6da9f7"
                                    className="icon--non-margin"
                                />
                            </Badge>
                        </Tooltip>
                    </Link>
                </Menu.Item>
                <Menu.Item
                    className="float-right padding-menu"
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
            </Menu>
            <CompareModal />
            <LoginModal />
        </Layout.Header>
    );
}

export default UserHeader;

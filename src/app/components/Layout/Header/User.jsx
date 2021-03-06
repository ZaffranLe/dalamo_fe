import React, { useEffect, useState } from "react";
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
    ArrowRightOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar, Tooltip, Badge, Skeleton, Input, Divider, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import Logo from "../../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { openModal as openCompareModal } from "../../../redux/slices/compare";
import { openModal as openLoginModal, logout } from "../../../redux/slices/login";
import { fetchCategories } from "../../../redux/slices/category";
import { fetchBrands } from "../../../redux/slices/brand";
import CompareModal from "../../Modal/Compare";
import LoginModal from "../../Modal/Login";
import { getSlug, getUserFromToken } from "../../../utils/common/common";
import ListReceiptModal from "../../Modal/Receipt";
import DetailReceipt from "../../Modal/Receipt/detail";
import _ from "lodash";
import { fetchProducts } from "../../../redux/slices/product";
import { setSearchResults, setOpenSearchResult } from "../../../redux/slices/header";
import { setOpenCart } from "../../../redux/slices/cart";
import { setUserModal } from "../../../redux/slices/user";
import UserModal from "../../Modal/UserInfo";

function UserHeader({ history }) {
    const dispatch = useDispatch();
    const { products: productsCompare } = useSelector((state) => state.compare);
    const { products: productsCart } = useSelector((state) => state.cart);
    const { categories } = useSelector((state) => state.category);
    const { brands } = useSelector((state) => state.brand);
    const { products } = useSelector((state) => state.product);

    const [receiptModal, setReceiptModal] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories(categories));
        dispatch(fetchBrands(brands));
        dispatch(fetchProducts(products));
    }, []);

    const handleOpenCompareModal = () => {
        dispatch(openCompareModal());
    };

    const handleOpenLoginModal = (key) => {
        dispatch(openLoginModal(key));
    };

    const handleLogout = () => {
        dispatch(logout(history));
    };

    const handleSearch = (e) => {
        let newProducts = [];
        const text = e.target.value;
        if (text && text.length >= 3) {
            newProducts = products.filter((product) => product["slug"].includes(getSlug(text)));
        }
        dispatch(setSearchResults({ result: newProducts, text }));
    };

    const user = getUserFromToken();

    return (
        <Layout.Header className="header fixed">
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="Logo dalamo" style={{ maxWidth: "100%" }} />
                </Link>
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
                        <Menu.Item key={category["id"]}>
                            <Link
                                to={{
                                    pathname: `/product/${category["slug"]}.${category["id"]}`,
                                }}
                            >
                                {category["name"]}
                            </Link>
                        </Menu.Item>
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
                    <Menu.Item key="all">
                        <Link to="/brand">Xem tất cả</Link>
                    </Menu.Item>
                    <Menu.Item key="divider">
                        <Divider>Thương hiệu nổi bật</Divider>
                    </Menu.Item>
                    {brands.slice(0, 10).map((brand, idx) => (
                        <Menu.Item key={brand["id"]}>
                            <Link
                                to={{
                                    pathname: `/brand/${brand["slug"]}.${brand["id"]}`,
                                }}
                            >
                                {brand["name"]}
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>

                <Menu.Item className="padding-menu" style={{ width: "20%" }}>
                    <Input
                        placeholder="Tìm kiếm..."
                        suffix={<SearchOutlined />}
                        defaultValue=""
                        onChange={_.debounce(handleSearch, 500)}
                        onFocus={() => dispatch(setOpenSearchResult(true))}
                        onBlur={() => dispatch(setOpenSearchResult(false))}
                    />
                </Menu.Item>
                {user ? (
                    <Menu.SubMenu
                        className="float-right padding-menu"
                        title={
                            <>
                                <span style={{ marginRight: 4 }}>Xin chào</span>
                                <span className="username">{user["fullName"]}</span>
                                <Avatar
                                    style={{ marginLeft: 8 }}
                                    src={`https://ui-avatars.com/api/?background=random&name=${user["fullName"]}`}
                                />
                            </>
                        }
                    >
                        <Menu.Item key="Profile" onClick={() => dispatch(setUserModal(true))}>
                            Tài khoản của tôi
                        </Menu.Item>
                        <Menu.Item key="Orders" onClick={() => setReceiptModal(true)}>
                            Danh sách đơn hàng
                        </Menu.Item>
                        <Menu.Item key="SignOut" onClick={handleLogout}>
                            Đăng xuất
                        </Menu.Item>
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
                <Menu.Item
                    onMouseEnter={() => dispatch(setOpenCart(true))}
                    onMouseLeave={() => dispatch(setOpenCart(false))}
                    className="float-right padding-menu"
                    key="Cart"
                >
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
            <ListReceiptModal open={receiptModal} onClose={() => setReceiptModal(false)} />
            <DetailReceipt />
            <UserModal />
        </Layout.Header>
    );
}

export default UserHeader;

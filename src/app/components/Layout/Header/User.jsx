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
import _ from "lodash";
import ProductMenu from "../../Product/product-menu";
import { fetchProducts } from "../../../redux/slices/product";

function UserHeader({ history }) {
    const dispatch = useDispatch();
    const productsCompare = useSelector((state) => state.compare.products);
    const productsCart = useSelector((state) => state.cart.products);
    const { categories } = useSelector((state) => state.category);
    const { brands } = useSelector((state) => state.brand);
    const { products } = useSelector((state) => state.product);

    const [searchedProducts, setSearchedProducts] = useState([]);
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

    const openReceiptModal = () => {
        setReceiptModal(true);
    };

    const closeReceiptModal = () => {
        setReceiptModal(false);
    };

    const handleSearch = (e) => {
        let newProducts = [];
        if (e.target.value) {
            newProducts = products.filter((product) => product["slug"].includes(getSlug(e.target.value)));
        }
        setSearchedProducts(newProducts);
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

                <Menu.SubMenu
                    className="padding-menu"
                    style={{width: "25%"}}
                    title={
                        <Input
                            placeholder="Tìm kiếm..."
                            suffix={<SearchOutlined />}
                            defaultValue=""
                            onChange={_.debounce(handleSearch, 500)}
                        />
                    }
                >
                    {searchedProducts.length > 0 ? (
                        searchedProducts.map((product, idx) => (
                            <React.Fragment key={product["id"]}>
                                <Menu.Item style={{ height: 100 }}>
                                    <ProductMenu key={idx} product={product} />
                                </Menu.Item>
                                <Menu.Divider />
                            </React.Fragment>
                        ))
                    ) : (
                        <Menu.Item>
                            <Alert message="Không tìm thấy sản phẩm phù hợp" />
                        </Menu.Item>
                    )}
                </Menu.SubMenu>
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
                        <Menu.Item key="Profile">Tài khoản của tôi</Menu.Item>
                        <Menu.Item key="Orders" onClick={openReceiptModal}>
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
                <Menu.Item className="float-right padding-menu" key="Cart">
                    <Link to="/cart">
                        <Tooltip title={`Giỏ hàng có ${productsCart.length} sản phẩm`}>
                            <Badge count={productsCart.length}>
                                <ShoppingTwoTone twoToneColor="#6da9f7" className="icon--non-margin" />
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
            <ListReceiptModal open={receiptModal} onClose={closeReceiptModal} />
        </Layout.Header>
    );
}

export default UserHeader;

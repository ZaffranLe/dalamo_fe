import { Layout, Button, Alert } from "antd";
import React, { useMemo } from "react";
import UserHeader from "./Header/User";
import UserFooter from "./Footer/User";
import "./Layout.scss";
import { FacebookOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ProductMenu from "../Product/product-menu";
import { setMouseEnterSearchResult } from "../../redux/slices/header";
import { setMouseEnterCart } from "../../redux/slices/cart";
import { Link } from "react-router-dom";
import { calcDiscountPrice, formatVietnameseCurrency } from "../../utils/common/common";

function UserLayout({ children, history }) {
    const { openSearchResult, searchResults, searchText, mouseEnterSearchResult } = useSelector(
        (state) => state.header
    );
    const { openCart, mouseEnterCart, products } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const discountPrice = useMemo(() => {
        let price = 0;
        products.forEach((product) => {
            price +=
                (product["isDiscount"]
                    ? calcDiscountPrice(product["price"], product["discountPercent"])
                    : parseInt(product["price"])) * parseInt(product["cartQuantity"]);
        });
        return price;
    }, [products]);

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
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
                <div
                    style={{
                        right: "24%",
                        top: "8%",
                        width: 600,
                        maxHeight: 400,
                        border: "1px solid #D9D9D9",
                        overflowY: "auto",
                        padding: 25,
                    }}
                    hidden={!openSearchResult && !mouseEnterSearchResult}
                    className="layout-fixed bg-white"
                    onMouseEnter={() => dispatch(setMouseEnterSearchResult(true))}
                    onMouseLeave={() => dispatch(setMouseEnterSearchResult(false))}
                >
                    <h2>Kết quả tìm kiếm</h2>
                    {searchResults.length > 0 ? (
                        searchResults.map((product) => <ProductMenu key={product["id"]} product={product} />)
                    ) : (
                        <Alert
                            type="warning"
                            message={searchText ? "Không có sản phẩm phù hợp" : "Mời bạn nhập sản phẩm cần tìm"}
                        />
                    )}
                </div>
                <div
                    style={{
                        right: "12%",
                        top: "8%",
                        width: 600,
                        maxHeight: 400,
                        border: "1px solid #D9D9D9",
                        overflowY: "auto",
                        padding: 25,
                    }}
                    hidden={!openCart && !mouseEnterCart}
                    className="layout-fixed bg-white"
                    onMouseEnter={() => dispatch(setMouseEnterCart(true))}
                    onMouseLeave={() => dispatch(setMouseEnterCart(false))}
                >
                    <h2>Giỏ hàng</h2>
                    {products.length > 0 ? (
                        <>
                            {products.map((product) => (
                                <ProductMenu key={product["id"]} product={product} cart />
                            ))}
                            <h3 style={{ float: "right" }}>
                                Tổng tiền: <b style={{ color: "red" }}>{formatVietnameseCurrency(discountPrice)}</b>
                            </h3>
                            <Link to="/cart">
                                <Button block style={{ background: "#668866", color: "white", fontWeight: "bold" }}>
                                    THANH TOÁN
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Alert type="info" message="Giỏ hàng chưa có sản phẩm" />
                    )}
                </div>
            </Layout>
        </Layout>
    );
}

export default UserLayout;

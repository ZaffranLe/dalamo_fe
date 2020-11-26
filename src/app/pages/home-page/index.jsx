import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Row, Skeleton } from "antd";
import Carousel from "./carousel";
import FeaturedSection from "./featured-section";
import ProductSection from "./product-section";
import ProductCarousel from "./product-carousel";
import CommentSection from "./comment-section";
import "./Home.scss";
import { Link } from "react-router-dom";

function HomePage(props) {
    const { hotProducts, isLoading } = useSelector((state) => state.product);

    useEffect(() => {
        document.title = "Trang chủ";
    }, []);

    return (
        <>
            <Row>
                <Carousel />
            </Row>
            <Row gutter={10} className="featured-section">
                <FeaturedSection />
            </Row>
            <Row className="product-section">
                <ProductSection />
            </Row>
            <Row style={{ marginTop: 10 }}>
                <Col span={24} style={{ textAlign: "center" }}>
                    <Link to="/product">
                        <Button type="link">
                            <u>Xem thêm các sản phẩm khác</u>
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row style={{ marginTop: 150 }}>
                <Col span={16} push={4}>
                    <h2 className="txt--font-lobster">Sản phẩm nổi bật</h2>
                </Col>
            </Row>
            <Row gutter={2} style={{ backgroundColor: "#668866", paddingTop: 25, paddingBottom: 25 }}>
                <Col span={24}>
                    <Skeleton loading={isLoading}>
                        <ProductCarousel products={hotProducts} />
                    </Skeleton>
                </Col>
            </Row>
            <Row style={{ marginTop: 150 }}>
                <Col span={16} push={4}>
                    <h2 className="txt--font-lobster">Đánh giá của khách hàng</h2>
                </Col>
            </Row>
            <Row
                style={{
                    backgroundColor: "#F6F6F6",
                    paddingTop: 100,
                    paddingBottom: 100,
                }}
            >
                <CommentSection />
            </Row>
        </>
    );
}

export default HomePage;

import React from "react";
import { useSelector } from "react-redux";
import { Button, Col, Row, Skeleton } from "antd";
import Carousel from "./carousel";
import FeaturedSection from "./featured-section";
import ProductSection from "./product-section";
import ProductCarousel from "./product-carousel";
import CommentSection from "./comment-section";
import "./Home.scss";

function HomePage(props) {
    const { hotProducts, isLoading } = useSelector((state) => state.product);

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
                    <Button type="link">
                        <u>Xem thêm các sản phẩm khác</u>
                    </Button>
                </Col>
            </Row>
            <Row style={{ marginTop: 150 }}>
                <Col span={16} push={4}>
                    <h2 className="txt--font-lobster">Sản phẩm nổi bật</h2>
                </Col>
            </Row>
            <Row
                gutter={2}
                style={{ backgroundColor: "#F6F6F6", paddingTop: 25, paddingBottom: 25 }}
            >
                <Skeleton loading={isLoading}>
                    <ProductCarousel
                        products={hotProducts.slice(0, Math.floor(hotProducts.length / 2))}
                    />
                </Skeleton>
                <Skeleton loading={isLoading}>
                    <ProductCarousel
                        products={hotProducts.slice(Math.floor(hotProducts.length / 2))}
                    />
                </Skeleton>
            </Row>
            <Row style={{ marginTop: 150 }}>
                <Col span={16} push={4}>
                    <h2 className="txt--font-lobster">Đánh giá của khách hàng</h2>
                </Col>
            </Row>
            <Row
                style={{
                    backgroundColor: "#CCFBE9",
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

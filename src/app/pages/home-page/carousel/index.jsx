import React, { useRef } from "react";
import { Row, Col, Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../Home.scss";

function HomeCarousel(props) {
    const carousel = useRef(null);

    const next = () => {
        carousel.current.next();
    };

    const prev = () => {
        carousel.current.prev();
    };

    return (
        <Col span={24} className="custom-carousel">
            <Button
                className="arrow-button arrow-button-left"
                icon={<LeftOutlined />}
                onClick={prev}
            />
            <Button
                className="arrow-button arrow-button-right"
                icon={<RightOutlined />}
                onClick={next}
            />
            <Carousel
                fade
                speed={2000}
                autoplay={true}
                autoplaySpeed={5000}
                pauseOnHover={false}
                dotPosition="bottom"
                ref={carousel}
            >
                <div className="custom-slide">
                    <Row className="slide-wrapper-row">
                        <Col span={12} push={12} className="slide-wrapper-col">
                            <div className="slide-content">
                                <h1>Nhập khẩu</h1>
                                <div>
                                    <p>100% từ CHLB Đức</p>
                                    <p>Made in Germany</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="custom-slide">
                    <Row className="slide-wrapper-row">
                        <Col span={12} push={12} className="slide-wrapper-col">
                            <div className="slide-content">
                                <h1>Hàng chính hãng</h1>
                                <div>
                                    <p>Nâng niu từng sản phẩm</p>
                                    <p>Vì sức khoẻ cộng đồng</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="custom-slide">
                    <Row className="slide-wrapper-row">
                        <Col span={12} push={12} className="slide-wrapper-col">
                            <div className="slide-content">
                                <h1>Dalamo</h1>
                                <div>
                                    <p>Bạn của mọi nhà</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Carousel>
        </Col>
    );
}

export default HomeCarousel;

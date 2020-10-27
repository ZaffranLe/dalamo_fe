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
                                <h1>Test 1</h1>
                                <div>
                                    <p>Short text</p>
                                    <p>Long text</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="custom-slide">
                    <Row className="slide-wrapper-row">
                        <Col span={12} push={12} className="slide-wrapper-col">
                            <div className="slide-content">
                                <h1>Test 2</h1>
                                <div>
                                    <p>A very complicated text ipsum</p>
                                    <p>Sample text</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="custom-slide">
                    <Row className="slide-wrapper-row">
                        <Col span={12} push={12} className="slide-wrapper-col">
                            <div className="slide-content">
                                <h1>Test 3</h1>
                                <div>
                                    <p>Lorem ipsum</p>
                                    <p>Sample text</p>
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

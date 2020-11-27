import { Col, PageHeader, Row, Input, Button, Space, Skeleton } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BrandCardGrid from "../../components/Brand/brand-card-grid";
import { fetchBrands } from "../../redux/slices/brand";

function Brand({ match }) {
    const { brands, isLoading } = useSelector((state) => state.brand);
    const dispatch = useDispatch();
    const [searchChar, setSearchChar] = useState("");

    const alphabets = [];
    for (let i = 0; i < 26; i++) {
        alphabets.push(String.fromCharCode(i + 65));
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch(fetchBrands(brands));
    }, []);

    const searchByChar = (char) => {
        setSearchChar(char);
    };

    const sortedBrands = useMemo(() => {
        const list = JSON.parse(JSON.stringify(brands))
            .filter((brand) =>
                searchChar ? brand.name.toLowerCase()[0] == searchChar.toLowerCase() : true
            )
            .sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        return list;
    }, [searchChar, brands]);

    return (
        <>
            <Row>
                <Col span={18} offset={3}>
                    <Row>
                        <Col span={24}>
                            <PageHeader title="Danh sách thương hiệu" ghost={false} />
                        </Col>
                    </Row>
                    <Row className="mb-15">
                        <Col span={24}>
                            <h3>Tất cả thương hiệu</h3>
                            <Space>
                                {alphabets.map((char, idx) => (
                                    <Button
                                        onClick={() => searchByChar(char)}
                                        type="link"
                                        key={idx}
                                    >
                                        {char}
                                    </Button>
                                ))}
                                <Button onClick={() => searchByChar("")} type="link">
                                    All
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Skeleton active loading={isLoading}>
                                <BrandCardGrid data={sortedBrands} />
                            </Skeleton>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Brand;

import { Col, PageHeader, Row, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BrandCardGrid from "../../components/Brand/brand-card-grid";

function Brand(props) {
    const { brands, isLoading } = useSelector(state => state.brand);
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

    return (
        <>
            <Row>
                <Col span={16} offset={4}>
                    <Row>
                        <Col span={24}>
                            <PageHeader title="Hãng sản xuất" ghost={false} />
                        </Col>
                    </Row>
                    <Row className="mb-15">
                        <Col span={8}>
                            <Input.Search placeholder="Tìm kiếm theo tên" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <BrandCardGrid data={brands} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Brand;
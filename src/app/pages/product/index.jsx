import React, { useEffect, useMemo } from "react";
import { Row, Col, PageHeader } from "antd";
import ProductCardGrid from "../../components/Product/product-card-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/product";

function Product(props) {
    const { products, isLoading } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts(products));
    }, []);

    const {
        match: {
            params: { brandSlug, categorySlug },
        },
    } = props;

    const processedProducts = useMemo(() => {
        let listProduct = products;
        if (brandSlug) {
            const [slug, id] = brandSlug.split(".");
            listProduct = products.filter((item) => item["brandId"] == id);
        } else if (categorySlug) {
            const [slug, id] = categorySlug.split(".");
            listProduct = products.filter((item) => item["categoryId"] == id);
        }
        return listProduct;
    }, [brandSlug, categorySlug]);

    return (
        <>
            <Row>
                <Col span={18} offset={3}>
                    <Row>
                        <Col span={24}>
                            <PageHeader title="Sản phẩm" ghost={false} />
                        </Col>
                    </Row>
                    <Row gutter={15}>
                        <Col span={6}>
                            <div style={{ padding: 15 }} className="bg-white">
                                <h3>Tìm kiếm</h3>
                            </div>
                        </Col>
                        <Col span={18}>
                            <ProductCardGrid data={processedProducts} loading={isLoading} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Product;

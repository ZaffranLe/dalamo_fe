import React, { useEffect } from "react";
import { Col, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import ProductCardGrid from "../../../components/Product/product-card-grid";
import {
    fetchHotProducts,
    fetchNewArrivalProducts,
    fetchNewProducts,
} from "../../../redux/slices/product";

function ProductSection(props) {
    const { hotProducts, newProducts, newArrivalProducts, isLoading } = useSelector(
        (state) => state.product
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHotProducts(hotProducts));
        dispatch(fetchNewProducts(newProducts));
        dispatch(fetchNewArrivalProducts(newArrivalProducts));
    }, []);

    return (
        <Col span={16} push={4}>
            <Tabs defaultActiveKey="new-arrival">
                <Tabs.TabPane tab="Hàng mới về" key="new-arrival">
                    <ProductCardGrid data={hotProducts.slice(0, 8)} loading={isLoading} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Sản phẩm bán chạy" key="best-seller">
                    <ProductCardGrid data={newProducts.slice(0, 8)} loading={isLoading} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Sản phẩm mới" key="new-product">
                    <ProductCardGrid data={newArrivalProducts.slice(0, 8)} loading={isLoading} />
                </Tabs.TabPane>
            </Tabs>
        </Col>
    );
}

export default ProductSection;

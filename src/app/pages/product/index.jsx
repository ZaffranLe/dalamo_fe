import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, PageHeader, Divider, Checkbox, Select, Pagination } from "antd";
import ProductCardGrid from "../../components/Product/product-card-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/product";
import { SortAscendingOutlined, SortDescendingOutlined, RiseOutlined, FallOutlined } from "@ant-design/icons";
import qs from "query-string";
import { Link } from "react-router-dom";

const SORT_VALUES = {
    ASC_PRICE: "asc_price",
    DESC_PRICE: "desc_price",
    ASC_NAME: "asc_name",
    DESC_NAME: "desc_name",
};

const SORT_MODES = [
    {
        text: "Giá tăng dần",
        icon: <RiseOutlined />,
        value: SORT_VALUES.ASC_PRICE,
    },
    {
        text: "Giá giảm dần",
        icon: <FallOutlined />,
        value: SORT_VALUES.DESC_PRICE,
    },
    {
        text: "Tên A -> Z",
        icon: <SortAscendingOutlined />,
        value: SORT_VALUES.ASC_NAME,
    },
    {
        text: "Tên Z -> A",
        icon: <SortDescendingOutlined />,
        value: SORT_VALUES.DESC_NAME,
    },
];

function Product(props) {
    const { products, isLoading } = useSelector((state) => state.product);
    const { brands } = useSelector((state) => state.brand);
    const { categories } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [processedProducts, setProcessedProducts] = useState([]);
    const [pageSize, setPageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts(products));
    }, []);

    const {
        match: {
            params: { brandSlug, categorySlug },
        },
        history,
        location,
        location: { search },
    } = props;

    useEffect(() => {
        let listProduct = [...products];
        if (selectedBrand) {
            listProduct = listProduct.filter((product) => product["brandId"] == selectedBrand["id"]);
        }
        if (selectedCategory) {
            listProduct = listProduct.filter((product) => product["categoryId"] == selectedCategory["id"]);
        }

        const searchObj = qs.parse(search);
        let sortValue = "";
        if (searchObj["sort"]) {
            sortValue = searchObj["sort"];
        }

        switch (sortValue) {
            case SORT_VALUES.ASC_PRICE:
                listProduct = listProduct.sort((p1, p2) => parseInt(p1.price) - parseInt(p2.price));
                break;
            case SORT_VALUES.DESC_PRICE:
                listProduct = listProduct.sort((p1, p2) => parseInt(p2.price) - parseInt(p1.price));
                break;
            case SORT_VALUES.ASC_NAME:
                listProduct = listProduct.sort((p1, p2) => (p1.name < p2.name ? -1 : p1.name > p2.name ? 1 : 0));
                break;
            case SORT_VALUES.DESC_NAME:
                listProduct = listProduct.sort((p1, p2) => (p1.name > p2.name ? -1 : p1.name < p2.name ? 1 : 0));
                break;
            default:
                break;
        }

        setProcessedProducts(listProduct);
    }, [selectedCategory, selectedBrand, search, products]);

    useEffect(() => {
        if (brandSlug) {
            const [slug, id] = brandSlug.split(".");
            const brand = brands.find((data) => data["id"] == id && data["slug"] == slug);
            if (brand) {
                setSelectedBrand(brand);
                setSelectedCategory("");
            }
        } else if (categorySlug) {
            const [slug, id] = categorySlug.split(".");
            const category = categories.find((data) => data["id"] == id && data["slug"] == slug);
            if (category) {
                setSelectedCategory(category);
                setSelectedBrand("");
            }
        }
    }, [brandSlug, categorySlug, products]);

    const handleChangeCategory = (category = "") => (e) => {
        if (selectedCategory) {
            if (categorySlug) {
                history.push("/product");
            }
        }
        setSelectedCategory(category);
        setCurrentPage(1);
    };
    
    const handleChangeBrand = (brand = "") => (e) => {
        if (selectedBrand) {
            if (brandSlug) {
                history.push("/product");
            }
        }
        setSelectedBrand(brand);
        setCurrentPage(1);
    };

    const handleChangePageSize = (currentPage, newPageSize) => {
        setPageSize(newPageSize);
    };

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

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
                            <div style={{ padding: 15 }} className="bg-white bordered">
                                <h3>Tìm kiếm</h3>
                                <Divider />
                                <h4>Danh mục</h4>
                                <Row>
                                    {selectedCategory ? (
                                        <Col span={24}>
                                            <Checkbox checked={true} onClick={handleChangeCategory("")}>
                                                {selectedCategory["name"]}
                                            </Checkbox>
                                        </Col>
                                    ) : (
                                        <>
                                            {categories.map((c) => (
                                                <Col key={c["id"]} span={24}>
                                                    <Checkbox checked={false} onChange={handleChangeCategory(c)}>
                                                        {c["name"]}
                                                    </Checkbox>
                                                </Col>
                                            ))}
                                        </>
                                    )}
                                </Row>
                                <Divider />
                                <h4>Hãng sản xuất</h4>
                                {selectedBrand ? (
                                    <Col span={24}>
                                        <Checkbox checked={true} onClick={handleChangeBrand("")}>
                                            {selectedBrand["name"]}
                                        </Checkbox>
                                    </Col>
                                ) : (
                                    <>
                                        {brands.map((b) => (
                                            <Col key={b["id"]} span={24}>
                                                <Checkbox checked={false} onChange={handleChangeBrand(b)}>
                                                    {b["name"]}
                                                </Checkbox>
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </div>
                        </Col>
                        <Col span={18} className="bordered">
                            <Row className="mb-5 mt-10">
                                <Col span={6}>
                                    <Select
                                        defaultValue={null}
                                        placeholder="Sắp xếp theo"
                                        style={{ width: "100%" }}
                                        // onChange={handleChangeSort}
                                    >
                                        {SORT_MODES.map((mode) => (
                                            <Select.Option key={mode["value"]} value={mode["value"]}>
                                                <Link to={`${location.pathname}?sort=${mode["value"]}`}>
                                                    {mode["icon"]} {mode["text"]}
                                                </Link>
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col span={18}>
                                    <Pagination
                                        showSizeChanger
                                        onShowSizeChange={handleChangePageSize}
                                        current={currentPage}
                                        pageSizeOptions={[8, 12, 24, 48]}
                                        pageSize={pageSize}
                                        total={processedProducts.length}
                                        className="float-right"
                                        onChange={handleChangePage}
                                    />
                                </Col>
                            </Row>
                            <ProductCardGrid
                                data={processedProducts.slice((currentPage - 1) * pageSize, pageSize * currentPage)}
                                loading={isLoading}
                            />
                            <Pagination
                                showSizeChanger
                                onShowSizeChange={handleChangePageSize}
                                current={currentPage}
                                pageSizeOptions={[8, 12, 24, 48]}
                                pageSize={pageSize}
                                total={processedProducts.length}
                                className="mb-15 float-right"
                                onChange={handleChangePage}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Product;

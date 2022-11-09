import { Col, PageHeader, Row } from "antd";

function AboutUs() {
    return <>
        <Row>
            <Col span={10} offset={7}>
                <h1 style={{ fontSize: '24px', marginTop: '40px' }}>Về chúng tôi</h1>
                <div>
                    {/* <p>Boost Go Corp là công ty marketing Việt Nam thành lập vào năm 2020. Đây là đứa con tinh thần của những người làm marketing hiểu rằng chất lượng tốt nhất đến từ môi trường tốt nhất.</p>
                    <p>Với sứ mệnh kiến tạo giá trị mới dẫn dắt xu hướng mới, Boost Go Corp luôn sẵn sàng đồng hành với mọi khách hàng, đối tác để sáng tạo và phát triển những nội dung chất lượng các trên nền tảng hàng đầu.</p>
                    <br /> */}
                    {/* <h1>Thông tin công ty</h1> */}
                    <br />
                    <p>Tên Công ty: <b>CÔNG TY CỔ PHẦN TẬP ĐOÀN MARKETING BOOSTGO</b></p>
                    <p>Tên Công ty tiếng Anh: <b>BOOSTGO MARKETING CORPORATION JOINT STOCK COMPANY</b></p>
                    <p>Tru Sở: Green Park Tower, 33 Dương Đình Nghệ, Yên Hoà, Cầu Giấy, Hà Nội.</p>
                    <p>Hotline: 03456.555.34</p>
                </div>
            </Col>
        </Row>
    </>
}

export default AboutUs;
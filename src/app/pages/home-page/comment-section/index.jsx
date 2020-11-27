import React, { useEffect } from "react";
import { Col, Carousel, Skeleton, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CommentBig from "./comment-big";
import { fetchComments } from "../../../redux/slices/comment";

function CommentSection(props) {
    const { comments, isLoading } = useSelector((state) => state.comment);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchComments(comments));
    }, []);

    return (
        <Skeleton loading={isLoading}>
            <Col span={24}>
                <Carousel slidesPerRow={3} draggable speed={2000} autoplay={true} autoplaySpeed={10000} pauseOnHover={false} dots={false}>
                    {comments.map((comment, idx) => (
                        <Row key={idx}>
                            <Col span={24}>
                                <CommentBig comment={comment} />
                            </Col>
                        </Row>
                    ))}
                </Carousel>
            </Col>
        </Skeleton>
    );
}

export default CommentSection;

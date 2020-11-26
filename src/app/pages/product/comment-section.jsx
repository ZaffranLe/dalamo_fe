import React from "react";
import moment from "moment";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Avatar, Comment, Input, Button, Divider } from "antd";

function ProductComment({ comments, averageRating, onComment }) {
    const user = window.userInfo;

    return (
        <>
            <Divider style={{ fontSize: 24 }}>Đánh giá của khách hàng</Divider>
            <h3 style={{ color: "#02937F" }}>
                {comments.length > 0 ? (
                    <>
                        {averageRating.map((rate, idx) =>
                            rate ? (
                                <StarFilled key={idx} color="#02937F" />
                            ) : (
                                <StarOutlined key={idx} />
                            )
                        )}{" "}
                        - Dựa trên {comments.length} đánh giá
                    </>
                ) : (
                    "Chưa có đánh giá nào cho sản phẩm này"
                )}
            </h3>
            {user && !comments.find((comment) => comment["idUser"] == user["id"]) && (
                <div className="mt-15 mb-15">
                    <Input.TextArea rows={4} placeholder="Hãy cho chúng tôi biết ý kiến của bạn" />
                </div>
            )}
            {comments.map((comment, idx) => {
                const stars = [0, 0, 0, 0, 0].fill(1, 0, comment["rate"]);
                return (
                    <Comment
                        key={idx}
                        author={comment["fullName"]}
                        avatar={
                            <Avatar
                                src={`https://ui-avatars.com/api/?background=random&name=${comment["fullName"]}`}
                                alt="avatar"
                            />
                        }
                        content={
                            <>
                                <span>
                                    {stars.map((star, idx) =>
                                        star ? (
                                            <StarFilled key={idx} className="theme-color" />
                                        ) : (
                                            <StarOutlined key={idx} />
                                        )
                                    )}
                                </span>
                                <p>{comment["content"]}</p>
                            </>
                        }
                        datetime={moment(comment["createdDate"]).format("YYYY-MM-DD HH:mm:ss")}
                    />
                );
            })}
        </>
    );
}

export default ProductComment;

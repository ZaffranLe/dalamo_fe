import React from "react";
import { Col, Skeleton } from "antd";
import PropTypes from "prop-types";
import faker from "faker";
import { HeartTwoTone, StarOutlined, StarFilled } from "@ant-design/icons";
import "./Comment.scss";
import Avatar from "antd/lib/avatar/avatar";
faker.locale = "vi";

function CommentBig(props) {
    const { comment } = props;
    const rating = [0, 0, 0, 0, 0];
    rating.fill(1, 0, comment["rate"]);
    return (
        <div className="text-center comment-slide">
            <Avatar size={100} src={`https://ui-avatars.com/api/?background=random&name=${comment["Fullname"]}`} alt="Avatar" style={{ marginBottom: "4px" }} />
            <br />
            {rating.map((rate, idx) =>
                rate ? <StarFilled key={idx} className="theme-color" /> : <StarOutlined key={idx} />
            )}
            <p>
                <span className="text-big">{comment["content"]}</span>
                <br />
                <HeartTwoTone twoToneColor="#D7385E" />
                <br />
                {comment["Fullname"]}
            </p>
        </div>
    );
}

CommentBig.propTypes = {
    comment: PropTypes.object,
};

CommentBig.defaultProps = {
    comment: {},
};

export default CommentBig;

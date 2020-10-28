import React from "react";
import { Col, Skeleton } from "antd";
import PropTypes from "prop-types";
import faker from "faker";
import { HeartTwoTone, StarOutlined, StarTwoTone } from "@ant-design/icons";
import "./Comment.scss";
faker.locale = "vi";

function CommentBig(props) {
    const { comment } = props;
    const rating = [0, 0, 0, 0, 0];
    rating.fill(1, 0, comment["rate"] - 1);
    return (
        <div className="text--center comment-slide">
            <img className="img--round img--border-black" src={faker.image.avatar()} alt="Avatar" />
            <br />
            {rating.map((rate) =>
                rate ? <StarTwoTone twoToneColor="#FF9642" /> : <StarOutlined />
            )}
            <p>
                <span className="text--big">{comment["content"]}</span>
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

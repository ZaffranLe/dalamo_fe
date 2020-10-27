import React from "react";
import { Col, Skeleton } from "antd";
import PropTypes from "prop-types";
import faker from "faker";

function CommentBig(props) {
    const { comment } = props;
    return (
        <>
            <img src={faker.image.avatar()} alt="Avatar" />
        </>
    );
}

CommentBig.propTypes = {
    comment: PropTypes.object,
}

CommentBig.defaultProps = {
    comment: {},
}

export default CommentBig;
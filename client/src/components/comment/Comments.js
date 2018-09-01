import React, { Component } from "react";
import propTypes from "prop-types";
import Comment from "./Comment";

class Comments extends Component {
  render() {
    const { comments, dilemmaId } = this.props;
    if (this.props.parentId) {
      return comments.map(comment => (
        <Comment
          key={comment._id}
          parentId={this.props.parentId}
          comment={comment}
          dilemmaId={dilemmaId}
        />
      ));
    } else {
      return comments.map(comment => (
        <Comment key={comment._id} comment={comment} dilemmaId={dilemmaId} />
      ));
    }

    // console.log("comments in commentfeed: " + comments);

    // console.log("dilemmaId in commentfeed: " + dilemmaId);

    // return comments.map(comment => (
    //   <Comment key={comment._id} comment={comment} dilemmaId={dilemmaId} />
    // ));
  }
}

export default Comments;

Comments.propTypes = {
  comments: propTypes.array.isRequired,
  dilemmaId: propTypes.string.isRequired
};

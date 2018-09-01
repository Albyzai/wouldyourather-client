import React, { Component } from "react";
import PropTypes from "prop-types";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplyField: false
    };
  }

  toggleReplyField = () => {
    // Toggles the visibility of the reply input field
    if (this.state.showReplyField) {
      this.setState({ showReplyField: false });
    } else {
      this.setState({ showReplyField: true });
    }
  };

  render() {
    const { comment, dilemmaId } = this.props;

    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "Maj",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec"
    ];

    var date = new Date(comment.date);

    var d = date.getDate();
    var m = monthNames[date.getMonth()];
    var y = date.getFullYear();

    return (
      <ul className="nested">
        <li>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <img
                    src={comment.commentpicture}
                    alt=""
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
                <div className="col-md-10">
                  <h4 className="card-title">{comment.author}</h4>
                  <p className="card-text">{comment.text}</p>
                  <small>{d + " " + m + " " + y}</small>
                  <br />
                  <div
                    className="btn btn-info pl-5 pr-5 mt-4"
                    onClick={() => this.toggleReplyField()}
                  >
                    Svar
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.showReplyField ? (
            <CommentForm dilemmaId={dilemmaId} parentId={comment._id} />
          ) : null}
          <Comments comments={comment.replies} dilemmaId={dilemmaId} />
        </li>
      </ul>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  dilemmaId: PropTypes.string.isRequired
};

export default Comment;

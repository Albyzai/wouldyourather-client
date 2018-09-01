import React, { Component } from "react";
import { addComment, addReply } from "../../actions/dilemmaActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const commentData = {
      text: this.state.comment
    };

    console.log(JSON.stringify("parentID: " + this.props.parentId));
    console.log(JSON.stringify("DilemmaID : " + this.props.dilemmaId));

    console.log("Adding reply");
    this.props.addReply(this.props.dilemmaId, this.props.parentId, commentData);

    // console.log("adding comment");
    // this.props.addComment(this.props.dilemmaId, commentData);

    this.props.parentId
      ? this.props.addReply(
          this.props.dilemmaId,
          this.props.parentId,
          commentData
        )
      : this.props.addComment(this.props.dilemmaId, commentData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              name="comment"
              rows="5"
              id="comment"
              placeholder="Skriv kommentar"
              onChange={this.onChange}
            />
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </div>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  dilemmaId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  dilemmas: state.dilemmas,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment, addReply }
)(CommentForm);

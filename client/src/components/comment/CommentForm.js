import React, { Component } from 'react';
import { addComment } from '../../actions/commentActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      text: this.state.comment,
      dilemmaId: this.props.dilemmaId,
      parentId: this.props.parentId
    };

    this.props.addComment(commentData);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.auth.isAuthenticated ? (
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
        ) : (
          <div />
        )}
      </React.Fragment>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  dilemmaId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  dilemmas: state.dilemmas,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);

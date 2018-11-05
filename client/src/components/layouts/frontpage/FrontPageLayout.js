import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getDilemma,
  addLike,
  removeLike
} from '../../../actions/dilemmaActions';
import { ScaleLoader } from 'react-spinners';

import CommentForm from './../../comment/CommentForm';
import Comments from '../../comment/Comments';

import Dilemma from './../../dilemma/Dilemma';

class FrontPageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addComment: false
    };
  }

  onLikeClick = (id) => {
    this.props.addLike(id);
  };

  toggleCommentForm = () => {
    this.setState.addComment
      ? this.setState({ addComment: false })
      : this.setState({ addComment: true });
  };

  componentDidMount() {
    this.props.getDilemma();
  }

  render() {
    const { dilemma, loading } = this.props.dilemmas;
    let dilemmaContent;

    if (Object.keys(dilemma).length === 0) {
      dilemmaContent = (
        <ScaleLoader sizeUnit={'px'} size={150} loading={loading} />
      );
    } else {
      dilemmaContent = (
        <React.Fragment>
          <Dilemma />
          <div className="comment-section">
            <div className="comments-wrapper">
              <CommentForm dilemmaId={dilemma._id} />
              <Comments
                comments={dilemma.comments}
                dilemmaId={dilemma._id}
                redVotes={dilemma.red_votes}
                blueVotes={dilemma.blue_votes}
              />
            </div>
            <aside />
          </div>
        </React.Fragment>
      );
    }

    /*
    if (dilemma === null || loading || Object.keys(dilemma).length === 0) {
      dilemmaContent = (
        <ScaleLoader sizeUnit={'px'} size={150} loading={loading} />
      );
    } else {
      dilemmaContent = (
        <div id="front-page-wrapper">
          <Dilemma
            id={dilemma._id}
            prefix={dilemma.prefix}
            red={dilemma.red}
            blue={dilemma.blue}
            redvotes={dilemma.red_votes}
            bluevotes={dilemma.blue_votes}
          />
          <Divider
            title={dilemma.title}
            user={dilemma.user}
            likes={dilemma.likes}
            onClick={this.onLikeClick.bind(this, this.state.id)}
          />
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                {this.state.addComment ? (
                  <CommentForm dilemmaId={dilemma._id} />
                ) : null}
                <div
                  className="btn btn-info pl-5 pr-5 mt-4"
                  onClick={() => this.toggleCommentForm()}
                >
                  Kommentér dilemma
                </div>

                <Comments comments={dilemma.comments} dilemmaId={dilemma._id} />
              </div>
              <div className="col-md-4" />
            </div>
          </div>
        </div>
      );
    } */

    return dilemmaContent;
  }
}

FrontPageLayout.propTypes = {
  getDilemma: propTypes.func.isRequired,
  addLike: propTypes.func.isRequired,
  removeLike: propTypes.func.isRequired,
  dilemmas: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  dilemmas: state.dilemmas,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getDilemma, addLike, removeLike }
)(FrontPageLayout);

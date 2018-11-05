import React, { Component } from 'react';
import propTypes from 'prop-types';
import CountUp from 'react-countup';
import { connect } from 'react-redux';
import Divider from './Divider';

import { addVote } from '../../actions/dilemmaActions';
import { getDilemma } from '../../actions/dilemmaActions';

class Dilemma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswered: false,
      clickedDilemma: ''
    };

    this.onVoteClick = this.onVoteClick.bind(this);
  }

  componentDidMount() {
    this.props.getDilemma();

    //  Check if dilemmas has already been answered
    const dilemma = this.props.dilemmas.dilemma;
    console.log(JSON.stringify(this.props.auth.user));
    if (
      (dilemma.red_votes.includes(this.props.auth.user.id) ||
        dilemma.blue_votes.includes(this.props.auth.user.id)) &&
      !this.state.isAnswered
    ) {
      console.log('is answered');
      this.setState({ isAnswered: true });
    } else {
      console.log('is not answered');
    }
  }

  calculatePercent = (number1, number2) => {
    return (number1 / (number1 + number2)) * 100;
  };

  onLikeClick = (id) => {
    this.props.addLike(id);
  };

  onVoteClick = (e, id) => {
    console.log('id: ' + id);
    //  Only works if dilemma isn't already answered
    if (!this.state.isAnswered) {
      //  Get the clicked dilemma and its color attribute
      const target = e.currentTarget;
      const color = target.dataset.color;

      //  Adds a vote to the identified dilemma
      this.props.addVote(id, color);

      if (this.props.auth.isAuthenticated) {
        console.log('Is authenticated');
      }

      //  Sets the component state, so that it may not be pressed again
      this.setState({ isAnswered: true, clickedDilemma: color });
    }
  };

  render() {
    const { dilemma } = this.props.dilemmas;
    const { _id, prefix, red, blue, red_votes, blue_votes } = dilemma;
    const isAnswered = this.state.isAnswered;

    const redPercent = this.calculatePercent(
      red_votes.length,
      blue_votes.length
    );
    const bluePercent = this.calculatePercent(
      blue_votes.length,
      red_votes.length
    );

    const blueResult = (
      <div className="result">
        <div className="percentage" id="blue-percent">
          <CountUp end={bluePercent} duration={2.5} suffix="%" />
        </div>
        <div className="total-votes">
          <span className="count">{blue_votes.length}</span>
          <span className="word" />
        </div>
        <div className="question-result">{blue}</div>
      </div>
    );

    const redResult = (
      <div className="result">
        <div className="percentage" id="red-percent">
          <CountUp end={redPercent} duration={2.5} suffix="%" />
        </div>
        <div className="total-votes">
          <span className="count">{red_votes.length}</span>
        </div>
        <div className="question-result">{red}</div>
      </div>
    );

    return (
      <React.Fragment>
        <section className="dilemma-section">
          <div className="arrow-left">Back</div>
          <div className="dilemma-title">
            <h4>
              {prefix} {dilemma.title}
            </h4>
          </div>

          <div
            id="red-dilemma-button"
            className="dilemma-button"
            data-color="red"
            onClick={(e) => this.onVoteClick(e, _id)}
          >
            {isAnswered ? (
              redResult
            ) : (
              <span className="question">{dilemma.red}</span>
            )}
          </div>
          <div
            id="blue-dilemma-button"
            className="dilemma-button"
            data-color="blue"
            onClick={(e) => this.onVoteClick(e, _id)}
          >
            {isAnswered ? (
              blueResult
            ) : (
              <span className="question">{dilemma.blue}</span>
            )}
          </div>

          <div className="arrow-right">Next</div>
        </section>
        <Divider
          title={dilemma.title}
          user={dilemma.user}
          onClick={this.onLikeClick.bind(this, this.state.id)}
        />
      </React.Fragment>

      /*<div className="container">
        <div className="row" id="textrow">
          <div className="col-md-12 text-center">
            {prefix ? (
              <h5>{prefix}, ville du så helst...</h5>
            ) : (
              <h5>Vil du helst...</h5>
            )}
          </div>
        </div>
        <div className="row" id="buttonrow">
          <div
            className="col-md-6 nomargin dilemma-button"
            id="bluebutton"
            onClick={() => this.onVoteClick(id, "blue")}
          >
            
            {this.state.clickedDilemma === "blue" ? blueCheck : null}
            {this.state.isAnswered ? (
              blueResult
            ) : (
              <p className="question">{blue}</p>
            )}
          </div>

          <div
            className="col-md-6 dilemma-button nomargin"
            id="redbutton"
            onClick={() => this.onVoteClick(id, "red")}
          >
            
            {this.state.clickedDilemma === "red" ? redCheck : null}
            {this.state.isAnswered ? (
              (redCheck, redResult)
            ) : (
              <p className="question">{red}</p>
            )}
          </div>
        </div>
      </div> */
    );
  }
}

Dilemma.propTypes = {
  getDilemma: propTypes.func.isRequired,
  prefix: propTypes.string,
  red: propTypes.string,
  blue: propTypes.string,
  red_votes: propTypes.number,
  blue_votes: propTypes.number
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  dilemmas: state.dilemmas,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getDilemma, addVote }
)(Dilemma);

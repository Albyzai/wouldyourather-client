import React, { Component } from "react";
import propTypes from "prop-types";
import CountUp from "react-countup";
import { addVote } from "../../actions/dilemmaActions";
import { connect } from "react-redux";

class Dilemma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dilemmaClicked: false,
      clickedDilemma: ""
    };
  }

  calculatePercent = (number1, number2) => {
    return (number1 / (number1 + number2)) * 100;
  };

  onVoteClick = (id, color) => {
    if (id && color && this.state.dilemmaClicked === false) {
      this.props.addVote(id, color);
      this.setState({ dilemmaClicked: true, clickedDilemma: color });
    }
  };

  render() {
    const { id, prefix, red, blue, redvotes, bluevotes } = this.props;

    const redPercent = this.calculatePercent(redvotes, bluevotes);
    const bluePercent = this.calculatePercent(bluevotes, redvotes);

    const blueResult = (
      <div className="result">
        <div className="percentage" id="blue-percent">
          <CountUp end={bluePercent} duration={2.5} suffix="%" />
        </div>
        <div className="total-votes">
          <span className="count">{bluevotes}</span>
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
          <span className="count">{redvotes}</span>
        </div>
        <div className="question-result">{red}</div>
      </div>
    );

    const redCheck = <div className="redCheckDiv" />;
    const blueCheck = <div className="blueCheckDiv" />;

    return (
      <div className="container">
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
            {/* Result goes here */}
            {this.state.clickedDilemma === "blue" ? blueCheck : null}
            {this.state.dilemmaClicked ? (
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
            {/* Result goes here  */}
            {this.state.clickedDilemma === "red" ? redCheck : null}
            {this.state.dilemmaClicked ? (
              (redCheck, redResult)
            ) : (
              <p className="question">{red}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Dilemma.propTypes = {
  prefix: propTypes.string,
  red: propTypes.string,
  blue: propTypes.string,
  red_votes: propTypes.number,
  blue_votes: propTypes.number
};

const mapStateToProps = state => ({
  dilemmas: state.dilemmas,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addVote }
)(Dilemma);

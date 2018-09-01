import React, { Component } from "react";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createDilemma } from "../../actions/dilemmaActions";
import TextFieldGroup from "../common/TextFieldGroup";

class DilemmaCreateForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      prefix: "",
      red: "",
      blue: "",
      errors: {}
    };
  }

  componentDidMount() {
    // Redirect the user if not logged in
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newDilemma = {
      title: this.state.title,
      prefix: this.state.prefix,
      red: this.state.red,
      blue: this.state.blue
    };

    this.props.createDilemma(newDilemma, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Lav Dilemma</h1>
              <p className="lead text-center">
                Opret et nyt dilemma til Vilduhelst
              </p>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Titel"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />

                <TextFieldGroup
                  placeholder="Præfiks. eks. '...', ville du helst"
                  name="prefix"
                  type="text"
                  value={this.state.prefix}
                  onChange={this.onChange}
                  error={errors.prefix}
                />

                <TextFieldGroup
                  placeholder="Blåt dilemma"
                  name="blue"
                  type="blue"
                  value={this.state.blue}
                  onChange={this.onChange}
                  error={errors.blue}
                />

                <TextFieldGroup
                  placeholder="Rødt dilemma"
                  name="red"
                  type="text"
                  value={this.state.red}
                  onChange={this.onChange}
                  error={errors.red}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DilemmaCreateForm.propTypes = {
  createDilemma: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createDilemma }
)(withRouter(DilemmaCreateForm));

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../actions/authActions';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const guestLinks = (
      <nav>
        <Link className="nav-link" to="/submit-dilemma">
          Indsend Dilemma
        </Link>
        <Link className="nav-link" to="/register">
          Opret bruger
        </Link>
        <Link className="nav-link" to="/login">
          Log ind
        </Link>
      </nav>
    );

    const authLinks = (
      <nav>
        <Link className="nav-link" to="/submit-dilemma">
          Indsend Dilemma
        </Link>
        <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
          Log ud
        </a>
      </nav>
    );

    return (
      <header className="container">
        <Link className="navbar-brand" to="/">
          Vilduhelst
        </Link>
        {isAuthenticated ? authLinks : guestLinks}
      </header>
    );
  }
}

AppNavbar.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AppNavbar);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from "reactstrap";

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
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link className="nav-link" to="/submit-dilemma">
            Indsend Dilemma
          </Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/register">
            Opret bruger
          </Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/login">
            Log ind
          </Link>
        </NavItem>
      </Nav>
    );

    const authLinks = (
      <Nav className="ml-auto" navbar>
        <Link className="nav-link" to="/submit-dilemma">
          Indsend Dilemma
        </Link>
        <NavItem>
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Log ud
          </a>
        </NavItem>
      </Nav>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <Link className="navbar-brand" to="/">
              Vilduhelst
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar />
            {isAuthenticated ? authLinks : guestLinks}
          </Container>
        </Navbar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AppNavbar);

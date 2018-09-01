// React Imports
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "reactstrap";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Component Imports
import AppNavbar from "./components/layout/AppNavbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DilemmaCreateForm from "./components/dilemma/DilemmaCreateForm";

// Redux Imports
import { Provider } from "react-redux";
import store from "./store";

// CSS Imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DilemmaLayout from "./components/layout/DilemmaLayout";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // TODO: Clear current profile

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Container fluid={true}>
              <Route path="/" component={DilemmaLayout} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <Route
                path="/submit-dilemma"
                component={DilemmaCreateForm}
                exact
              />
            </Container>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

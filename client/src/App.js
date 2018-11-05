// React Imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

// Component Imports
import AppNavbar from './components/layouts/partials/navigation/AppNavbar';
import Footer from './components/layouts/partials/footer/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DilemmaCreateForm from './components/dilemma/DilemmaCreateForm';
import FrontPageLayout from './components/layouts/frontpage/FrontPageLayout';

// Redux Imports
import { Provider } from 'react-redux';
import store from './store';

// CSS Imports
import './css/main.css';

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
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <section id="content" className="container-fluid">
              <Route path="/" component={FrontPageLayout} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <Route
                path="/submit-dilemma"
                component={DilemmaCreateForm}
                exact
              />
            </section>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

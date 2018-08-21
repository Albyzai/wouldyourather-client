import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import DilemmaList from './components/DilemmaList';
import DilemmaModal from './components/DilemmaModal';
import { Container } from 'reactstrap';

// Redux
import { Provider } from 'react-redux';
import store from './store';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <DilemmaModal />
            <DilemmaList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;

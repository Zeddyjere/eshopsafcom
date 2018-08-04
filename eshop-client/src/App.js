import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Main from './Containers/Main';
import Navbar from './Components/Navbar';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Main />
        </div>
      </Router>
    );
  }
}

export default App;

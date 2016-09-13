import React from 'react';
import {RouteHandler} from 'react-router';
import Navbar from './Navbar';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <RouteHandler />
      </div>
    );
  }
}

export default App;

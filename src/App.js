import React, { Component } from 'react';
import logo from './assets/logo.png';
import './App.css';

import zest from './data/jokes';

class App extends Component {

  state = {
    jokes: {}
  }

  componentWillMount = () => {
    console.log('App.js componentWillMount');

    this.setState({
      jokes: zest
    })
  }

  componentDidMount = () => {
    console.log('App.js componentDidMount');

  }


  render() {

    console.log('state jokes are', this.state.jokes);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Joke Generator
          </p>

          <button
            type="button"
            name="testNowBtn"
            className="App-button">
            Fetch Joke
          </button>
        </header>
      </div>
    );
  }
}

export default App;

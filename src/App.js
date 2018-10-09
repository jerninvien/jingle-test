import React, { Component, Fragment } from 'react';
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
      currentJoke: {
        setup: 'Click above to see a random joke!'
      },
      jokes: zest,
      jokeCount: 0
    })
  }

  componentDidMount = () => {
    console.log('App.js componentDidMount');

  }

  onButtonClick = e => {
    // console.log('onButtonClick', e);
    e.preventDefault();

    const nextJoke = this.setRandomJoke(this.state.jokes);


    this.setState({
      currentJoke: nextJoke,
      jokeCount: this.state.jokeCount + 1
    });

    this.fetchImage(nextJoke.punchline);
  }

  setRandomJoke = obj => {
    const keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
  }

  fetchImage = punchline => {
    console.log('fetchImage punchline', punchline);
  }

  render() {

    console.log('state jokes are', this.state.currentJoke);

    const zest = this.state.currentJoke ? this.state.currentJoke.setup : '.';
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button
            onClick={this.onButtonClick}
            type="button"
            name="testNowBtn"
            className="App-button"
          >
            Jokes Here {this.state.jokeCount}
          </button>

          <div style={{height: '50px'}}>
            <p>{zest}</p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;

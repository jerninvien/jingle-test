import React, { Component } from 'react';
import nlp  from 'compromise';
import SecondTimer from './components/timer';

import logo from './assets/logo.png';
import './App.css';

import localJokes from './data/jokes';

const loremflickrURL = 'https://loremflickr.com/640/480/';

class App extends Component {
  state = {
    imageLoading: false,
    imageSource: require('./assets/7yAl.gif'),
    jokeCount: 0,
    jokeTimer: 0,
    jokes: localJokes,
    currentJoke: {
      punchline: '',
      setup: 'Click button for a random joke!'
    },
  }

  onButtonClick = e => {
    e.preventDefault();

    const nextJoke = this.getRandomJoke(this.state.jokes);

    const nlpJoke = nlp(nextJoke.setup + ' ' + nextJoke.punchline);
    const nouns = nlpJoke.nouns().out('text');

    this.setState({
      currentJoke: nextJoke,
      imageLoading: true,
      imageSource: require('./assets/7yAl.gif'),
      jokeCount: this.state.jokeCount + 1
    });

    if (nouns.length > 0) {
      this.setImageSource(nouns);
    } else {
      this.setState({
        currentJoke: nextJoke,
        imageSource: loremflickrURL
      });
    }
  }

  getRandomJoke = obj => {
    const keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
  }

  setImageSource = (nouns) => {
    setTimeout(() => {
      // console.log('getRandomWord', nouns);
      const nounz = nouns.split(' ').filter(w => w.length > 2);
      const randomWord = nounz[nounz.length * Math.random() << 0];

      this.setState({
        imageSource: loremflickrURL + randomWord
      });
    }, 1000);
  }

  onLoad = e => {
    if (e.target.src.includes('loremflickr')) {
      this.setState({
        imageLoading: false,
      });
    }
  }

  resetCounter = () => {
    this.setState({ jokeCount: 0 });
  }

  render() {
    // console.log('state jokes are', this.state);

    const {
      imageLoading,
      imageSource,
      jokeCount,
    } = this.state;

    return (
      <div className='App'>
        {jokeCount > 9 &&
          <div className='App-lightbox' onClick={this.resetCounter}>
            <div className='App-opacity-box'></div>
            <p className='App-lightbox-text'>
              Joke Limit Reached. Please wait
              {<SecondTimer
                  durationSeconds={300}
                  resetCounter={this.resetCounter}
                />} for the next batch!
            </p>
          </div>
        }

        <header className='App-header'>
          <img
            alt='logo'
            className='App-logo'
            src={logo}
          />
          <button
            className='App-button'
            disabled={imageLoading}
            name='testNowBtn'
            onClick={this.onButtonClick}
            type='button'
          >
            Get Joke {this.state.jokeCount}
          </button>

          <div className='App-texts'>
            <p>{this.state.currentJoke.setup}</p>
          </div>

          <div className='ImageWrapper'>
            <img
              alt=''
              className='Image'
              onLoad={this.onLoad}
              src={imageSource}
            />
          </div>

          <div className='App-texts'>
            {(imageSource.includes('loremflickr') && !imageLoading) &&
              <p>{this.state.currentJoke.punchline}</p>
            }
          </div>
        </header>
      </div>
    );
  }
}

export default App;

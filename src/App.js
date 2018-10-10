import React, { Component } from 'react';
import nlp  from 'compromise';

import localJokes from './data/jokes';

import Lightbox from './components/lightbox';
import logo from './assets/logo.png';
import './App.css';


const loremflickrURL = 'https://loremflickr.com/640/480/';

class App extends Component {
  state = {
    imageLoading: false,
    imageSource: require('./assets/7yAl.gif'),
    jokeCount: 0,
    jokes: localJokes,
    currentJoke: {
      punchline: '',
      setup: 'Click button for a random joke!'
    },
  }

  onButtonClick = e => {
    e.preventDefault();

    const nextJoke = this.getRandomJoke(this.state.jokes);
    this.setImageSource(nextJoke);
  }

  getRandomJoke = obj => {
    const keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
  }

  setImageSource = nextJoke => {
    this.setState({
      currentJoke: nextJoke,
      imageLoading: true,
      imageSource: require('./assets/7yAl.gif'),
      jokeCount: this.state.jokeCount + 1
    });

    const nlpJoke = nlp(nextJoke.setup + ' ' + nextJoke.punchline);
    const nouns = nlpJoke.nouns().out('text');

    if (nouns.length > 0) {
      setTimeout(() => {
        const nounz = nouns.split(' ').filter(w => w.length > 2);
        const randomWord = nounz[nounz.length * Math.random() << 0];

        this.setState({ imageSource: loremflickrURL + randomWord });
      }, 500);
    } else {
      this.setState({ imageSource: loremflickrURL });
    }
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
        {jokeCount > 2 &&
          <Lightbox
            durationSeconds={300}
            resetCounter={this.resetCounter}
          />
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

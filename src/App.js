import React, { Component } from 'react';
import nlp  from 'compromise'; // One of the best NLPs

// Normally I would set up a public interface in an
// components/index.js file in components/ to simplify the below
// imports but did not have time now see following link:
// https://alligator.io/react/index-js-public-interfaces/
import { Lightbox } from 'components/LightBox/lightbox';
import { JokeText } from 'components/JokeText/joketext';

// Preload local jokes scraped from https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke
import localJokes from './data/jokes';

import './App.css';
import logo from './assets/logo.png';

// Import local GIF once to avoid repeated requires inside App class
import localGif from './assets/7yAl.gif';
const loremflickrURL = 'https://loremflickr.com/800/600/';


export default class App extends Component {
  state = {
    imageLoading: false,
    imageSource: '',
    jokeCounter: 0,
    jokes: localJokes,
    currentJoke: {
      punchline: '',
      setup: 'Click above for a joke!'
    },
  }

  onButtonClick = e => {
    e.preventDefault();

    // Get random joke from json local cache
    const nextJoke = this.getRandomJoke(this.state.jokes);

    // Run *simple* NLP on joke text to extract nouns and fetch
    // image from random image API based on keyword search
    this.setImageBasedOnJokeText(nextJoke);
  }

  getRandomJoke = obj => {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  }

  setImageBasedOnJokeText = nextJoke => {
    this.setState({
      currentJoke: nextJoke,
      imageLoading: true,
      imageSource: localGif,
      jokeCounter: this.state.jokeCounter + 1
    });

    const nlpOnJoke = nlp(nextJoke.setup + ' ' + nextJoke.punchline);
    const filteredNouns = nlpOnJoke.nouns().out('text').split(' ').filter(w => w.length > 2);
    const randomNoun = filteredNouns[filteredNouns.length * Math.random() << 0] || "";

    console.log('randomNoun', randomNoun);

    setTimeout(() => {
      this.setState({ imageSource: loremflickrURL+randomNoun });
    }, 250 + Math.random()*1000);
  }

  onLoad = e => {
    if (e.target.src.includes('loremflickr')) {
      this.setState({ imageLoading: false });
    }
  }

  resetCounter = () => this.setState({ jokeCounter: 0 })

  render() {
    const { imageLoading, imageSource, jokeCounter} = this.state;

    return (
      <div className='App'>
        {jokeCounter > 9 &&
          <Lightbox durationSeconds={300} resetCounter={this.resetCounter} />
        }

        <header className='App-header'>
          <img alt='logo' className='App-logo' src={logo} />
          <button
            className='App-button'
            disabled={imageLoading}
            name='testNowBtn'
            onClick={this.onButtonClick}
            type='button'
          >
            Get Joke {this.state.jokeCounter}
          </button>

          <JokeText jokeText={this.state.currentJoke.setup}/>

          <div className='ImageWrapper'>
            <img alt='' className='Image' onLoad={this.onLoad} src={imageSource} />
          </div>

          <JokeText
            jokeText={this.state.currentJoke.punchline}
            showText={imageSource.includes('loremflickr') && !imageLoading}
          />
        </header>
      </div>
    );
  }
}

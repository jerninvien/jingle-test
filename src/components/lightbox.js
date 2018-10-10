import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SecondTimer from './timer';
import './lightbox.css';

export default class Lightbox extends Component {
  static propTypes = {
    durationSeconds: PropTypes.number.isRequired,
    resetCounter: PropTypes.func.isRequired
  }

  render() {
    const { resetCounter } = this.props;
    return(
      <div className='App-lightbox' onClick={resetCounter}>
        <div className='App-opacity-box'></div>
        <p className='App-lightbox-text'>
          Joke Limit Reached. Please wait
          {<SecondTimer
              durationSeconds={300}
              resetCounter={resetCounter}
            />} for the next batch!
        </p>
      </div>
    )
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SecondTimer } from 'components/Timer/timer';
import './lightbox.css';

export const Lightbox = ({ resetCounter }) => {
  return(
    <div className='App-lightbox' onClick={resetCounter}>
      <div className='App-opacity-box'></div>
      <p className='App-lightbox-text'>
        Joke Limit Reached. Please wait
        {<SecondTimer durationSeconds={300} resetCounter={resetCounter} />}
        for the next batch!
      </p>
    </div>
  )
}

Lightbox.propTypes = {
  durationSeconds: PropTypes.number.isRequired,
  resetCounter: PropTypes.func.isRequired
}

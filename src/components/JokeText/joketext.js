import React from 'react';
import PropTypes from 'prop-types';
import './joketext.css';

export const JokeText = ({ jokeText, showText }) =>
  <div className='App-texts'>
    {showText && <p>{jokeText}</p>}
  </div>

JokeText.propTypes = {
  jokeText: PropTypes.string.isRequired,
  showText: PropTypes.bool,
}

JokeText.defaultProps = {
  showText: true
}

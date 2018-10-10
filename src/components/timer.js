import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SecondTimer extends Component {
  static propTypes = {
    durationSeconds: PropTypes.number.isRequired,
    resetCounter: PropTypes.func.isRequired
  }

  state = {
    timeRemaining: 600
  }

  componentDidMount = () => {
    this.startTimer(this.props.durationSeconds);
  }

  // Adapted from https://stackoverflow.com/a/20618517
  startTimer = duration => {
    let timer = duration;

    this._timerRef = setInterval(() => {
      let minutes = parseInt(timer / 60, 10);
      let seconds = parseInt(timer % 60, 10);

      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.setState({
        timeRemaining: minutes + ":" + seconds
      });

      if (--timer < 0) {
        this.props.resetCounter();
      }
    }, 1000);
  }

  componentWillUnmount = () => {
    console.log('Timer componentWillUnmount');
    if (this._timerRef) {
      clearInterval(this._timerRef);  
    }
  }

  render() {
    return(
      <span> {this.state.timeRemaining} </span>
    )
  }
}

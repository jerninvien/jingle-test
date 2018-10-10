import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SecondTimer extends Component {
  static propTypes = {
    durationSeconds: PropTypes.number.isRequired,
    resetCounter: PropTypes.func.isRequired
  }

  state = {
    timeRemaining: '5:00'
  }

  componentDidMount = () => {
    // Adapted from https://stackoverflow.com/a/20618517
    let timer = this.props.durationSeconds;
    this._timerRef = setInterval(() => {
      let minutes = parseInt(timer / 60, 10);
      let seconds = parseInt(timer % 60, 10);
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.setState({ timeRemaining: minutes + ":" + seconds });

      if (--timer < 0) {
        this.props.resetCounter();
      }
    }, 1000);
  }

  componentWillUnmount = () => {
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

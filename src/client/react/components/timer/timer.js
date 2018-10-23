/* eslint-disable react/no-unused-state */
// This rule does not currently work well with getDerivedStateFromProps
// However a fix is in progress

import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static propTypes = {
    countTimer: PropTypes.func.isRequired,
    updateQuizProgress: PropTypes.func.isRequired,
    progress: PropTypes.string.isRequired,
    timer: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      timerInterval: null,
      started: false,
      paused: false,
      red: false,
    }
  }

  static getDerivedStateFromProps(
    { timer, progress, updateQuizProgress, countTimer },
    { timerInterval: oldTimer, red, started, paused },
  ) {
    if (!started) {
      const timerInterval = setInterval(() => {
        countTimer()
      }, 1000)
      return {
        started: true,
        timerInterval,
      }
    }
    if (timer < 11 && !red) {
      return { red: true }
    }
    if (timer <= 0) {
      clearInterval(oldTimer)
      updateQuizProgress('result')
    }
    if (progress === 'question' && paused) {
      const timerInterval = setInterval(() => {
        countTimer()
      }, 1000)
      return {
        timerInterval,
        paused: false,
      }
    } else if (progress !== 'question' && !paused) {
      clearInterval(oldTimer)
      return { paused: true }
    }
    return {}
  }

  componentWillUnmount() {
    clearInterval(this.state.timerInterval)
  }

  render() {
    const { timer } = this.props
    const { red } = this.state
    let minutes = Math.floor(timer / 60).toString()
    minutes = minutes.length < 2
      ? `0${minutes}`
      : minutes
    let seconds = (timer % 60).toString()
    seconds = seconds.length < 2
      ? `0${seconds}`
      : seconds

    return (
      <div className={red ? 'timer timer--red' : 'timer'}>
        {minutes}:{seconds}
      </div>
    )
  }
}

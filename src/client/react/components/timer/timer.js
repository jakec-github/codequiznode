import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static propTypes = {
    countTimer: PropTypes.func.isRequired,
    updateQuizProgress: PropTypes.func.isRequired,
    questionProgress: PropTypes.string.isRequired,
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
    { timer, questionProgress, updateQuizProgress, countTimer },
    { timerInterval: oldTimer, red, started, paused },
  ) {
    console.log('--------------------')
    if (!started) {
      console.log('Starting timer')
      const timerInterval = setInterval(() => {
        countTimer()
      }, 1000)
      return {
        started: true,
        timerInterval,
      }
    }
    if (timer < 11 && !red) {
      console.log('Change class here')
      return { red: true }
    }
    if (timer <= 0) {
      clearInterval(oldTimer)
      updateQuizProgress('result')
    }
    if (questionProgress === 'question' && paused) {
      console.log('Restarting')
      const timerInterval = setInterval(() => {
        countTimer()
      }, 1000)
      return {
        timerInterval,
        paused: false,
      }
    } else if (questionProgress !== 'question' && !paused) {
      console.log('pausing')
      clearInterval(oldTimer)
      return { paused: true }
    }
    return {}
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
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

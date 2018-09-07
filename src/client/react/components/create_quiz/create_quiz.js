import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static propTypes = {
    updateQuizField: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    timer: PropTypes.number.isRequired,
  }

  handleInputChange = ({ target }) => {
    const value = target.name === 'title'
      ? target.value.replace(/_/g, '')
      : target.value

    this.props.updateQuizField(target.name, value)
  }

  handleTimerChange = ({ target }) => {
    this.props.updateQuizField(target.name, parseInt(target.value, 10))
  }

  render() {
    const timeLimit = this.props.timer
      ? `${this.props.timer} minute${this.props.timer === 1 ? '' : 's'}`
      : `No time limit`
    return (
      <div className="create-quiz">
        <input
          type="text"
          name="title"
          className="create-quiz__title"
          onChange={this.handleInputChange}
          value={this.props.title}
          placeholder="Title"
        />
        <textarea
          name="description"
          className="create-quiz__description"
          rows="4"
          onChange={this.handleInputChange}
          value={this.props.description}
          placeholder="A short description"
        />
        <p className="create-quiz__time-limit">{timeLimit}</p>
        <input
          name="timer"
          className="create-quiz__slider"
          type="range"
          min="0"
          max="30"
          onChange={this.handleTimerChange}
          value={this.props.timer}
        />
      </div>
    )
  }
}

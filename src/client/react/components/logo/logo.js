import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  handleIconClick = () => {
    this.props.history.push({
      pathname: '/',
    })
  }

  render() {
    const variations = [
      '<code_quiz>',
      '#Code Quiz',
      '//Code Quiz',
      '[code,quiz]',
      '{code:quiz}',
      'codeQuiz',
    ]
    return (
      <h2
        className="header__logo"
        onClick={this.handleIconClick}
      >
        {variations[Math.floor(Math.random() * 6)]}
      </h2>
    )
  }
}

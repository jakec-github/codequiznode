import React from 'react'
import PropTypes from 'prop-types'


export default class extends React.Component {
  static propTypes = {
    addScore: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired,
    scores: PropTypes.arrayOf(PropTypes.object).isRequired,
    quizData: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
    authenticated: PropTypes.bool.isRequired,
    questionSet: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  componentDidMount = () => {
    const { authenticated, quizData, scores, score, addScore } = this.props
    if (authenticated) {
      const highScore = scores.filter(oldScore => oldScore.quiz === quizData._id)
      const newScore = {
        quiz: quizData._id,
        score,
      }
      if (!highScore.length) {
        const newScores = [...scores, newScore]
        addScore(newScores, newScore)
      } else if (highScore[0].score < score) {
        const newScores = [
          ...scores.filter(oldScore => oldScore.quiz !== quizData._id),
          newScore,
        ]
        addScore(newScores, newScore)
      }
    }
  }

  handleMenuClick = () => {
    this.props.history.push({
      pathname: '/',
    })
  }

  render() {
    const score = Math.floor((this.props.score / this.props.questionSet.length) * 100)

    return (
      <div className="result u-container">
        <p className="result__text">Your score is...</p>
        <div className="result__percentage">{score}%</div>
        <p className="result__score">{this.props.score} out of {this.props.questionSet.length}</p>
        <div id="menu" className="button button--nav" onClick={this.handleMenuClick}>Menu</div>
      </div>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static propTypes = {
    loadQuizzes: PropTypes.func.isRequired,
    updateQuizProgress: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    allQuizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadingAllQuizzes: PropTypes.bool.isRequired,
    scores: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  componentDidMount = () => {
    this.props.loadQuizzes()
  }

  handleQuizClick = (event) => {
    this.props.updateQuizProgress('start')
    const quizId = event.target.dataset.id
    this.props.history.push({
      pathname: `/quiz/${quizId}`,
    })
  }

  handleCreateClick = () => {
    this.props.history.push({
      pathname: `/quizEditor`,
    })
  }

  render() {
    const quizzes = []
    const { scores } = this.props
    this.props.allQuizzes.forEach((quiz, i) => {
      let score = false
      for (let j = 0; i < scores.length; j += 1) {
        if (scores[j].quiz === quiz.id) {
          const percent = Math.floor((scores[j].score / quiz.length) * 100)
          quizzes.push(<article className="button button--quiz" data-id={quiz.id} onClick={this.handleQuizClick} key={i.toString()}>{quiz.name}<div className="button__insert">{percent}%</div></article>)
          score = true
          break
        }
      }
      if (!score) {
        quizzes.push(<article className="button button--quiz" data-id={quiz.id} onClick={this.handleQuizClick} key={i.toString()}>{quiz.name}</article>)
      }
    })

    return (
      <div className="home">
        {quizzes}
        { this.props.loggedIn &&
          <article className="button button--nav" onClick={this.handleCreateClick}>Make a quiz</article>
        }
      </div>
    )
  }
}

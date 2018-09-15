import React from 'react'
import PropTypes from 'prop-types'

import Loading from '../loading/loading'
import FetchError from '../fetch_error/fetch_error'
import Quiz from '../quiz/container'

export default class extends React.Component {
  static propTypes = {
    loadQuizzes: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    allQuizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadingAllQuizzes: PropTypes.bool.isRequired,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    scores: PropTypes.arrayOf(PropTypes.object).isRequired,
    favourites: PropTypes.arrayOf(PropTypes.string).isRequired,
    username: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  componentDidMount = () => {
    this.props.loadQuizzes()
  }

  handleCreateClick = () => {
    this.props.history.push({
      pathname: `/quizEditor`,
    })
  }

  render() {
    const quizzes = []
    const {
      scores,
      favourites,
      errors,
      loadingAllQuizzes,
      authenticated,
      allQuizzes,
      loadQuizzes,
      username } = this.props
    allQuizzes.forEach((quiz, i) => {
      const totalScore = scores.filter(score => score.quiz === quiz.id)
      // const favourite = favourites.some(favourite => )
      const percentScore = totalScore.length
        ? Math.floor((totalScore[0].score / quiz.length) * 100)
        : -1
      const favourite = favourites.includes(quiz.id)
      const owner = quiz.creator === username
      quizzes.push((
        <Quiz
          name={quiz.name}
          creator={quiz.creator}
          owner={owner}
          score={percentScore}
          favourite={favourite}
          id={quiz.id}
          key={i.toString()}
          onClick={this.handleQuizClick}
        />
      ))
    })
    let errorMessage
    const isError = errors.some((error) => {
      if (error.connection === 'allQuizzes') {
        errorMessage = error.message
        return true
      }
      return false
    })

    return (
      <div className="home">
        { loadingAllQuizzes &&
          <Loading />
        }
        { (isError && !loadingAllQuizzes) &&
          <FetchError
            text={errorMessage}
            clickable={{ clickable: true, func: loadQuizzes }}
          />
        }
        { (!loadingAllQuizzes && !isError) &&
          quizzes
        }
        { authenticated &&
          <article className="button button--nav" onClick={this.handleCreateClick}>Make a quiz</article>
        }
      </div>
    )
  }
}

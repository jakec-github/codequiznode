import React from 'react'
import PropTypes from 'prop-types'

import Loading from '../loading/loading'
import FetchError from '../fetch_error/fetch_error'
import QuizList from '../quiz_list/quiz_list'

export default class extends React.Component {
  static propTypes = {
    loadQuizzes: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    allQuizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadingAllQuizzes: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    favourites: PropTypes.arrayOf(PropTypes.string).isRequired,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    const {
      loadingAllQuizzes,
      authenticated,
      errors,
      loadQuizzes,
      allQuizzes,
      favourites,
      username,
    } = this.props

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
          <div className="home__flex">
            <article className="mdc-card home__container">
              <h3>Featured</h3>
              <QuizList
                quizzes={
                  allQuizzes
                  .filter(quiz => quiz.featured)
                  .map(quiz => quiz.id)
                }
              />
            </article>
            <article className="mdc-card home__container">
              <h3>Favourites</h3>
              { authenticated &&
                <QuizList
                  quizzes={
                    allQuizzes
                      .filter(quiz => favourites.includes(quiz.id))
                      .map(quiz => quiz.id)
                    }
                />
              }
              { !authenticated &&
                <div className="home__login-container">
                  <div className="home__login-message">
                    <p>Login to save favourites and track scores</p>
                  </div>
                </div>
              }
            </article>
            <article className="mdc-card home__container">
              { authenticated &&
                <svg
                  className="home__create-icon"
                  onClick={this.handleCreateClick}
                >
                  <use xlinkHref="/sprite.svg#icon-add" />
                </svg>
              }
              <h3>Your Quizzes</h3>
              { authenticated &&
                <QuizList
                  quizzes={
                    allQuizzes
                      .filter(quiz => quiz.creator === username)
                      .map(quiz => quiz.id)
                    }
                />
              }
              { !authenticated &&
                <div className="home__login-container">
                  <div className="home__login-message">
                    <p>Login to make your own quizzes</p>
                  </div>
                </div>
              }
            </article>
          </div>
        }
      </div>
    )
  }

  // render() {
  //   const quizzes = []
  //   const {
  //     scores,
  //     favourites,
  //     errors,
  //     loadingAllQuizzes,
  //     authenticated,
  //     allQuizzes,
  //     loadQuizzes,
  //     username } = this.props
  //   allQuizzes.forEach((quiz, i) => {
  //     const totalScore = scores.filter(score => score.quiz === quiz.id)
  //     // const favourite = favourites.some(favourite => )
  //     const percentScore = totalScore.length
  //       ? Math.floor((totalScore[0].score / quiz.length) * 100)
  //       : -1
  //     const favourite = favourites.includes(quiz.id)
  //     const owner = quiz.creator === username
  //     quizzes.push((
  //       <Quiz
  //         name={quiz.name}
  //         creator={quiz.creator}
  //         owner={owner}
  //         score={percentScore}
  //         favourite={favourite}
  //         id={quiz.id}
  //         key={i.toString()}
  //         onClick={this.handleQuizClick}
  //       />
  //     ))
  //   })
  //   let errorMessage
  //   const isError = errors.some((error) => {
  //     if (error.connection === 'allQuizzes') {
  //       errorMessage = error.message
  //       return true
  //     }
  //     return false
  //   })
  //
  //   return (
  //     <div className="home">
  //       { loadingAllQuizzes &&
  //         <Loading />
  //       }
  //       { (isError && !loadingAllQuizzes) &&
  //         <FetchError
  //           text={errorMessage}
  //           clickable={{ clickable: true, func: loadQuizzes }}
  //         />
  //       }
  //       { (!loadingAllQuizzes && !isError) &&
  //         quizzes
  //       }
  //       { authenticated &&
  //         <article className="button button--nav" onClick={this.handleCreateClick}>Make a quiz</article>
  //       }
  //     </div>
  //   )
  // }
}

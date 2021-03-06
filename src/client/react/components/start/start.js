import React from 'react'
import PropTypes from 'prop-types'

import Loading from '../loading/loading'
import FetchError from '../fetch_error/fetch_error'


export default class extends React.Component {
  static propTypes = {
    setTimer: PropTypes.func.isRequired,
    resetQuiz: PropTypes.func.isRequired,
    loadQuiz: PropTypes.func.isRequired,
    updateQuizProgress: PropTypes.func.isRequired,
    loadingQuiz: PropTypes.bool.isRequired,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    quizData: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      timeLimit: PropTypes.number,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      // quizData: {},
    }
  }

  componentDidMount = () => {
    this.getQuiz()
  }

  componentWillUnmount = () => {
    this.props.setTimer(this.props.quizData.timeLimit)
  }

  getQuiz = () => {
    const { loadQuiz, match: { params: { username, quiz } } } = this.props
    loadQuiz(username, quiz)
  }

  handleStartClick = (event) => {
    const { resetQuiz, updateQuizProgress } = this.props
    resetQuiz()
    updateQuizProgress('question')
  }

  render() {
    const {
      loadQuiz,
      loadingQuiz,
      quizData,
      errors, match: { params: { username, quiz } },
    } = this.props

    let errorMessage
    const isError = errors.some((error) => {
      if (error.connection === 'quiz') {
        errorMessage = error.message
        return true
      }
      return false
    })

    return (
      <div className="start mdc-card">
        { loadingQuiz &&
          <Loading />
        }
        { (isError && !loadingQuiz) &&
          <FetchError
            text={errorMessage}
            clickable={{ clickable: true, func: this.getQuiz }}
          />
        }
        { (!loadingQuiz && !isError) &&
          <React.Fragment>
            <h1 className="start__title">{quizData.name}</h1>
            <p className="start__description">{quizData.description}</p>
            { quizData.timeLimit > 0 &&
              <p className="start__timer">You have {quizData.timeLimit / 60} minutes</p>
            }
            <div
              id="start-button"
              className="mdc-button mdc-button--raised start__button"
              onClick={this.handleStartClick}
            >
              Start
            </div>
          </React.Fragment>
        }
      </div>
    )
  }
}

// className="button button--nav"

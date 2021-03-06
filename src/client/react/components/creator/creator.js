import React from 'react'
import PropTypes from 'prop-types'

import CreateQuiz from '../create_quiz/container'
import CreateQuestion from '../create_question/container'
import Loading from '../loading/loading'

export default class extends React.Component {
  static propTypes = {
    changeCreatorPosition: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    deleteQuiz: PropTypes.func.isRequired,
    initiateSubmit: PropTypes.func.isRequired,
    refreshSubmitted: PropTypes.func.isRequired,
    cleanQuestions: PropTypes.func.isRequired,
    creatorPosition: PropTypes.number.isRequired,
    // questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    quiz: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      timer: PropTypes.number.isRequired,
      // questions: PropTypes.array.isRequired,
    }).isRequired,
    submitted: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    newQuiz: PropTypes.string.isRequired,
    sendingQuiz: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props)

    this.state = {
      submitConfirm: false,
      deleteConfirm: false,
    }
  }

  componentDidUpdate = () => {
    if (this.props.submitted) {
      this.props.history.push({
        pathname: `/quiz/${this.props.newQuiz}`,
      })
      this.props.refreshSubmitted()
    }
  }

  handleNavClick = ({ target }) => {
    const {
      creatorPosition,
      quiz: { questions },
      changeCreatorPosition,
      cleanQuestions,
      addQuestion,
    } = this.props

    cleanQuestions()
    if (target.id === 'back' && creatorPosition > 0) {
      changeCreatorPosition(creatorPosition - 1)
    } else if (target.id === 'forward' && creatorPosition < 30) {
      if (creatorPosition === questions.length) {
        addQuestion()
      }
      changeCreatorPosition(creatorPosition + 1)
    }
  }

  handleSubmitClick = () => {
    if (!this.state.deleteConfirm) {
      this.setState({
        submitConfirm: true,
      })
    }
  }

  handleDeleteClick = () => {
    if (!this.state.submitConfirm) {
      this.setState({
        deleteConfirm: true,
      })
    }
  }

  handleConfirmClick = ({ target }) => {
    if (target.id === 'yes') {
      if (this.state.submitConfirm) {
        this.props.initiateSubmit()
      } else if (this.props.creatorPosition === 0) {
        this.props.deleteQuiz()
      } else {
        this.deleteQuestion()
      }
    }
    this.setState({
      deleteConfirm: false,
      submitConfirm: false,
    })
  }

  deleteQuestion = () => {
    const {
      creatorPosition,
      quiz: { questions },
      changeCreatorPosition,
      deleteQuestion,
    } = this.props

    deleteQuestion(creatorPosition - 1)
    if (creatorPosition === questions.length) {
      changeCreatorPosition(creatorPosition - 1)
    }
  }

  checkQuiz = () => {
    const { title, description } = this.props.quiz
    const { quiz: { questions } } = this.props
    if (
      !title.length
      || !description.length
      || questions.length < 3
    ) {
      return false
    }
    for (let i = 0; i < questions.length; i += 1) {
      const { question, codes, answer, duds, explanation } = questions[i]
      if (
        !question.length
        || !answer.length
        || !duds.length
        || !explanation.length
      ) {
        return false
      }
      for (let j = 0; j < codes.length; j += 1) {
        if (!codes[j].contents.length) {
          return false
        }
      }
      for (let j = 0; j < duds.length; j += 1) {
        if (!duds[j].length) {
          return false
        }
      }
    }
    return true
  }

  render() {
    const isValid = this.checkQuiz()
    if (this.props.creatorPosition < 1) {
      console.log('Should work')
    }
    if (this.props.sendingQuiz) {
      return (
        <div className="creator">
          <Loading
            text="Uploading..."
          />
        </div>
      )
    }
    return (
      <div className="creator u-container">
        { this.props.creatorPosition < 1 &&
          <CreateQuiz />
        }
        { this.props.creatorPosition > 0 &&
          <CreateQuestion />
        }
        <div className="creator__console">
          { (this.state.submitConfirm || this.state.deleteConfirm) &&
            <div className="creator__nav-box u-margin-top-tiny u-margin-bottom-tiny">
              <div
                className="creator__nav creator__nav--no mdc-button mdc-button--raised creator__button u-no-margin"
                id="no"
                onClick={this.handleConfirmClick}
              >
                No
              </div>
              <div
                className="creator__nav creator__nav--yes mdc-button mdc-button--raised creator__button"
                id="yes"
                onClick={this.handleConfirmClick}
              >
                Yes
              </div>
            </div>
          }
          { !(this.state.submitConfirm || this.state.deleteConfirm) &&
            <div className="creator__nav-box u-margin-top-tiny">
              <div
                className="creator__nav creator__nav--back mdc-button mdc-button--raised creator__button u-no-margin"
                id="back"
                onClick={this.handleNavClick}
              >
                Back
              </div>
              <div
                className="creator__nav creator__nav--forward mdc-button mdc-button--raised creator__button"
                id="forward"
                onClick={this.handleNavClick}
              >
                Forward
              </div>
            </div>
          }
          <div
            className="creator__delete mdc-button mdc-button--raised creator__button u-margin-top-tiny"
            onClick={this.handleDeleteClick}
          >
            { this.state.deleteConfirm &&
              <span>Are you sure?</span>
            }
            { (!this.state.deleteConfirm && this.props.creatorPosition === 0) &&
              <span>Delete Quiz</span>
            }
            { (!this.state.deleteConfirm && this.props.creatorPosition > 0) &&
              <span>Delete Question</span>
            }
          </div>
          { isValid &&
            <div
              className="creator__submit-quiz mdc-button mdc-button--raised creator__button"
              onClick={this.handleSubmitClick}
            >
              { this.state.submitConfirm &&
                <span>Are you sure?</span>
              }
              { !this.state.submitConfirm &&
                <span>Submit</span>
              }
            </div>
          }
          { !isValid &&
            <button
              className="creator__submit-quiz mdc-button mdc-button--raised creator__button"
              disabled
            >
              { this.state.submitConfirm &&
                <span>Are you sure?</span>
              }
              { !this.state.submitConfirm &&
                <span>Submit</span>
              }
            </button>
          }
        </div>
      </div>
    )
  }
}

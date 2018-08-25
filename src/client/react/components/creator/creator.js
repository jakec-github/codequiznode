import React from 'react'
import PropTypes from 'prop-types'

import CreateQuiz from '../create_quiz/container'
import CreateQuestion from '../create_question/container'

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
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    quiz: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      timer: PropTypes.number.isRequired,
      questions: PropTypes.array.isRequired,
    }).isRequired,
    submitted: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    newQuiz: PropTypes.string.isRequired,
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
    this.props.cleanQuestions()
    if (target.id === 'back' && this.props.creatorPosition > 0) {
      this.props.changeCreatorPosition(this.props.creatorPosition - 1)
    } else if (target.id === 'forward' && this.props.creatorPosition < 30) {
      if (this.props.creatorPosition === this.props.questions.length) {
        this.props.addQuestion()
      }
      this.props.changeCreatorPosition(this.props.creatorPosition + 1)
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
        console.log('Confirm')
        this.props.initiateSubmit()
      } else {
        console.log('Delete confirmed')
        if (this.props.creatorPosition === 0) {
          this.deleteQuiz()
        } else {
          this.deleteQuestion()
        }
      }
    }
    this.setState({
      deleteConfirm: false,
      submitConfirm: false,
    })
  }

  deleteQuiz = () => {
    this.props.deleteQuiz()
  }

  deleteQuestion = () => {
    this.props.deleteQuestion(this.props.creatorPosition - 1)
    if (this.props.creatorPosition === this.props.questions.length) {
      this.props.changeCreatorPosition(this.props.creatorPosition - 1)
    }
  }

  checkQuiz = () => {
    const { title, description } = this.props.quiz
    const { questions } = this.props
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
    console.log(isValid)
    // Use isValid

    return (
      <div className="creator">
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
                className="creator__nav creator__nav--no button button--nav u-no-margin"
                id="no"
                onClick={this.handleConfirmClick}
              >
                No
              </div>
              <div
                className="creator__nav creator__nav--yes button button--nav"
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
                className="creator__nav creator__nav--back button button--nav-blue u-no-margin"
                id="back"
                onClick={this.handleNavClick}
              >
                Back
              </div>
              <div
                className="creator__nav creator__nav--forward button button--nav-blue"
                id="forward"
                onClick={this.handleNavClick}
              >
                Forward
              </div>
            </div>
          }
          <div
            className="creator__delete button button--nav-blue"
            onClick={this.handleDeleteClick}
          >
            { this.state.deleteConfirm &&
              <p>Are you sure?</p>
            }
            { (!this.state.deleteConfirm && this.props.creatorPosition === 0) &&
              <p>Delete Quiz</p>
            }
            { (!this.state.deleteConfirm && this.props.creatorPosition > 0) &&
              <p>Delete Question</p>
            }
          </div>
          { isValid &&
            <div
              className="creator__submit-quiz button button--nav-blue"
              onClick={this.handleSubmitClick}
            >
              { this.state.submitConfirm &&
                <p>Are you sure?</p>
              }
              { !this.state.submitConfirm &&
                <p>Submit</p>
              }
            </div>
          }
          { !isValid &&
            <div
              className="creator__submit-quiz button button--nav-grey"
            >
              { this.state.submitConfirm &&
                <p>Are you sure?</p>
              }
              { !this.state.submitConfirm &&
                <p>Submit</p>
              }
            </div>
          }
        </div>
      </div>
    )
  }
}

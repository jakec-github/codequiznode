import React from 'react'
import PropTypes from 'prop-types'

import CreateQuiz from '../create_quiz/container'
import CreateQuestion from '../create_question/container'

export default class extends React.Component {
  static propTypes = {
    creatorPosition: PropTypes.number.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeCreatorPosition: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    deleteQuiz: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)

    this.state = {
      submitConfirm: false,
      deleteConfirm: false,
    }
  }

  handleNavClick = ({ target }) => {
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

  updateState = (key, value) => {
    this.setState({
      [key]: value,
    })
  }

  handleConfirmClick = ({ target }) => {
    if (target.id === 'yes') {
      if (this.state.submitConfirm) {
        console.log('Confirm')
        this.submitQuiz()
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

  // POSSIBLY WILL remove as only called in one place
  submitQuiz = () => {
    // this.storeQuestion()
    // this.props.updateQuiz({
    //   title: this.state.title,
    //   description: this.state.description,
    //   timer: this.state.timer,
    // })
    console.log('Submitting')
    // this.props.changeLocation('created')
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

  render() {
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
        </div>
      </div>
    )
  }
}

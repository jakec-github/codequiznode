import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static propTypes = {
    iterateQuestion: PropTypes.func.isRequired,
    iterateScore: PropTypes.func.isRequired,
    updateQuizProgress: PropTypes.func.isRequired,
    updateProgress: PropTypes.func.isRequired,
    sendDifficulty: PropTypes.func.isRequired,
    questionNumber: PropTypes.number.isRequired,
    questionSet: PropTypes.arrayOf(PropTypes.object).isRequired,
    progress: PropTypes.string.isRequired,
    // quizSize: PropTypes.number.isRequired,
    // changeLocation: PropTypes.func.isRequired,
  }

  handleNextClick = () => {
    if (this.props.questionNumber < this.props.questionSet.length - 1) {
      this.props.iterateQuestion()
    } else {
      this.props.updateQuizProgress('result')
    }

    // this.props.oldIterateQuestion()
    this.props.updateProgress('question')
  }

  handleAnswerClick = ({ target }) => {
    const {
      questionSet,
      questionNumber,
      updateProgress,
      iterateScore,
      sendDifficulty,
    } = this.props


    const { correct } = target.dataset
    // const data = {
    //   _id: this.props.questionSet[this.props.questionNumber]._id,
    //   correct,
    // }
    const { _id } = questionSet[questionNumber]
    if (correct === 'correct') {
      updateProgress('correct')
      iterateScore()
    } else {
      updateProgress('incorrect')
    }

    // Need to sort out this fetch request
    sendDifficulty(_id, correct)
  //   fetch('/public/difficulty', {
  //     method: 'POST',
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //     }),
  //     body: JSON.stringify(data),
  //   })
  //     .then(() => console.log('Difficulty updated'))
  //     .catch(err => console.log(err))
  }

  handleLearnClick = () => {
    this.props.updateProgress('explanation')
  }

  render() {
    const { progress } = this.props
    // Consider nesting if statement in return statement
    const thisQuestion = this.props.questionSet[this.props.questionNumber]
    const next = this.props.questionNumber + 1 === this.props.questionSet.length
      ? 'Result'
      : 'Next'
    const answers = []
    if (progress === 'question') {
      // Change to forEach
      for (let i = 0; i < thisQuestion.duds.length; i += 1) {
        answers.push((
          <article
            className="mdc-button mdc-button--raised question__choice question__choice--lower"
            data-correct="incorrect"
            onClick={this.handleAnswerClick}
            key={i.toString()}
          >
            {thisQuestion.duds[i].text}
          </article>
        ))
      }
      answers.push((
        <article
          className="mdc-button mdc-button--raised question__choice question__choice--lower"
          data-correct="correct"
          onClick={this.handleAnswerClick}
          key={thisQuestion.duds.length.toString()}
        >
          {thisQuestion.answer}
        </article>
      ))
      for (let i = answers.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (answers.length))
        const temp = answers[i]
        answers[i] = answers[j]
        answers[j] = temp
      }
    }

    return (
      <React.Fragment>
        { progress === 'question' &&
          <div className="question__panel question__panel--choice" id="answer-panel">
            {answers}
          </div>
        }
        { progress === 'correct' &&
          <div className="question__panel question__panel--correct" id="correct-panel">
            <p className="question__panel-result">Correct</p>
            <article className="mdc-button mdc-button--raised question__choice" id="learn" onClick={this.handleLearnClick}>Learn more</article>
            <article className="mdc-button mdc-button--raised question__choice" id="next" onClick={this.handleNextClick}>{next}</article>
          </div>
        }
        { progress === 'incorrect' &&
          <div className="question__panel question__panel--incorrect" id="incorrect-panel">
            <p className="question__panel-result">Wrong Answer!</p>
            <article className="mdc-button mdc-button--raised question__choice" id="learn" onClick={this.handleLearnClick}>See answer</article>
            <article className="mdc-button mdc-button--raised question__choice" id="next" onClick={this.handleNextClick}>{next}</article>
          </div>
        }
        { progress === 'explanation' &&
          <div className="question__panel question__panel--explanation" id="explanation-panel">
            <p className="question__panel-answer">{thisQuestion.answer}</p>
            <p className="question__panel-text">{thisQuestion.explanation}</p>
            <div className="u-centre-width-25rem">
              <article className="mdc-button mdc-button--raised question__choice" id="next" onClick={this.handleNextClick}>{next}</article>
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}

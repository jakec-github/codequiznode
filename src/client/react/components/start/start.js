import React from 'react'
import PropTypes from 'prop-types'


export default class extends React.Component {
  static propTypes = {
    // changeLocation: PropTypes.func.isRequired,
    // setQuestions: PropTypes.func.isRequired,
    resetQuiz: PropTypes.func.isRequired,
    loadQuiz: PropTypes.func.isRequired,
    updateQuizProgress: PropTypes.func.isRequired,
    // quizId: PropTypes.number.isRequired,
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
    const { username, quiz } = this.props.match.params
    // console.log(this.props)
    // console.log(this.props.match.params.id)
    console.log(username, quiz)
    this.props.loadQuiz(username, quiz)
  }

  handleStartClick = (event) => {
    this.props.resetQuiz()
    this.props.updateQuizProgress('question')
  }

  render() {
    console.log('rendering start')
    return (
      <div className="start">
        <h1 className="start__title">{this.props.quizData.name}</h1>
        <p className="start__description">{this.props.quizData.description}</p>
        { this.props.quizData.timeLimit > 0 &&
          <p className="start__timer">You have {this.props.quizData.timeLimit / 60} minutes</p>
        }
        <div id="start-button" className="button button--nav" onClick={this.handleStartClick}>Start</div>
      </div>
    )
  }
}

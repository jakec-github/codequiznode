import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Main from './main'

const mapStateToProps = state => ({
  location: state.main.location,
  quizProgress: state.main.quizProgress,
  questionNumber: state.question.questionNumber,
})

export default withRouter(connect(mapStateToProps, null)(Main))

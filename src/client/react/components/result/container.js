import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { mainActionCreators } from '../../../reducers/main'
import { userActionCreators } from '../../../reducers/user'
import Result from './result'

const mapStateToProps = state => ({
  userId: state.user.userId,
  authenticated: state.user.authenticated,
  score: state.question.score,
  scores: state.user.scores,
  quizData: state.main.quizData,
  questionSet: state.question.questionSet,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...mainActionCreators, ...userActionCreators }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Result))

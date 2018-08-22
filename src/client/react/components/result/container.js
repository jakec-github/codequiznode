import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { store, CHANGE_LOCATION } from '../../store'
import { mainActionCreators } from '../../../reducers/main'
import { userActionCreators } from '../../../reducers/user'
import Result from './result'

const mapStateToProps = state => ({
  userId: state.user.userId,
  loggedIn: state.user.loggedIn,
  score: state.question.score,
  scores: state.user.scores,
  quizData: state.main.quizData,
  questionSet: state.question.questionSet,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...mainActionCreators, ...userActionCreators }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Result)

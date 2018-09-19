import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { questionActionCreators } from '../../../reducers/question'
import { mainActionCreators } from '../../../reducers/main'

import Start from './start'

const mapStateToProps = state => ({
  quizId: state.question.quizId,
  quizData: state.main.quizData,
  loadingQuiz: state.main.loadingQuiz,
  errors: state.main.errors,
})

// Should swap out Object.assign
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...questionActionCreators, ...mainActionCreators }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Start))

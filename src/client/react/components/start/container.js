import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { questionActionCreators } from '../../../reducers/question'
import { mainActionCreators } from '../../../reducers/main'

import Start from './start'

const mapStateToProps = state => ({
  quizId: state.question.quizId,
  quizData: state.main.quizData,
  loadingQuiz: state.main.loadingQuiz,
})

// Should swap out Object.assign
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...questionActionCreators, ...mainActionCreators }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Start)

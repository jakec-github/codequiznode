import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Panel from './panel'
import { questionActionCreators } from '../../../reducers/question'
import { mainActionCreators } from '../../../reducers/main'

const mapStateToProps = state => ({
  questionProgress: state.main.questionProgress,
  questionNumber: state.question.questionNumber,
  questionSet: state.question.questionSet,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...questionActionCreators, ...mainActionCreators }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Panel)

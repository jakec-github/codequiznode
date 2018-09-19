import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { mainActionCreators } from '../../../reducers/main'
import { questionActionCreators } from '../../../reducers/question'

import Timer from './timer'

const mapStateToProps = state => ({
  questionProgress: state.main.questionProgress,
  timer: state.question.timer,
})

// Should swap out Object.assign
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...mainActionCreators, ...questionActionCreators }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Timer)

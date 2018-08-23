import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { creatorActionCreators } from '../../../reducers/creator'
import CreateQuiz from './create_quiz'

const mapStateToProps = state => ({
  title: state.creator.quiz.title,
  description: state.creator.quiz.description,
  timer: state.creator.quiz.timer,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  creatorActionCreators,
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz)

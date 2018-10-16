import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { creatorActionCreators } from '../../../reducers/creator'
import CreateQuestion from './create_question'

const mapStateToProps = state => ({
  creatorPosition: state.creator.creatorPosition,
  questions: state.creator.quiz.questions, // This doesn't reference a specific item in the store
})

const mapDispatchToProps = dispatch => bindActionCreators(creatorActionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion)

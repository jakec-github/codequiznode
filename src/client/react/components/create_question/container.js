import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { creatorActionCreators } from '../../../reducers/creator'
import CreateQuestion from './create_question'

const mapStateToProps = state => ({
  creatorPosition: state.creator.creatorPosition,
  questions: state.creator.questions,
})

const mapDispatchToProps = dispatch => bindActionCreators(creatorActionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion)

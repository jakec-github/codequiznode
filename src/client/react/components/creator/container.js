import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'

import { creatorActionCreators } from '../../../reducers/creator'
import { mainActionCreators } from '../../../reducers/main'
import Creator from './creator'

const mapStateToProps = state => ({
  creatorPosition: state.creator.creatorPosition,
  questions: state.creator.questions,
  quiz: state.creator.quiz,
  submitted: state.creator.submitted,
  newQuiz: state.creator.newQuiz,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  { ...creatorActionCreators, ...mainActionCreators },
  dispatch,
)


export default connect(mapStateToProps, mapDispatchToProps)(Creator)

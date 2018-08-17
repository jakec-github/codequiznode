import { connect } from 'react-redux'

import Progress from './progress'

const mapStateToProps = state => ({
  questionNumber: state.question.questionNumber,
  questionSet: state.question.questionSet,
})

export default connect(mapStateToProps, null)(Progress)

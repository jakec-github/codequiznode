import { connect } from 'react-redux'

import Quiz from './quiz'

const mapStateToProps = state => ({
  quizProgress: state.main.quizProgress,
  quizData: state.main.quizData,
})

export default connect(mapStateToProps, null)(Quiz)

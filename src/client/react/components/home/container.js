import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { questionActionCreators } from '../../../reducers/question'
import { mainActionCreators } from '../../../reducers/main'

import Home from './home'

const mapStateToProps = state => ({
  userId: state.user.userId,
  authenticated: state.user.authenticated,
  allQuizzes: state.main.allQuizzes,
  loadingAllQuizzes: state.main.loadingAllQuizzes,
  scores: state.user.scores,
})

// SHould swap out use of object.assign
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...questionActionCreators, ...mainActionCreators }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)

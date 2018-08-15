import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { questionActionCreators } from '../../../reducers/question'
import { mainActionCreators } from '../../../reducers/main'

import Home from './home'

const mapStateToProps = state => ({
  userId: state.user.userId,
  loggedIn: state.user.loggedIn,
  allQuizzes: state.main.allQuizzes,
  loadingAllQuizzes: state.main.loadingAllQuizzes,
})

// SHould swap out use of object.assign
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, questionActionCreators, mainActionCreators), dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)

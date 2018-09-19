import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { userActionCreators } from '../../../reducers/user'
import { mainActionCreators } from '../../../reducers/main'
import QuizLink from './quiz_link'

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  allQuizzes: state.main.allQuizzes,
  favourites: state.user.favourites,
  scores: state.user.scores,
  username: state.user.username,
})

const mapDispatchtoProps = dispatch =>
  bindActionCreators({ ...userActionCreators, ...mainActionCreators }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(QuizLink))

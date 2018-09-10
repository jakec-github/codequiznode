import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { userActionCreators } from '../../../reducers/user'
import User from './user'

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  username: state.user.username,
  loadingAuth: state.user.loadingAuth,
  loginError: state.user.loginError,
  invalidLogin: state.user.invalidLogin,
  signupError: state.user.signupError,
  errorMessage: state.user.errorMessage,
})

const mapDispatchToProps = dispatch => bindActionCreators(userActionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(User)

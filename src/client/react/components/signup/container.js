import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { userActionCreators } from '../../../reducers/user'
import SignUp from './signup'

const mapStateToProps = state => ({
  usernameInput: state.user.usernameInput,
  passwordInput: state.user.passwordInput,
  confirmPasswordInput: state.user.confirmPasswordInput,
})

const mapDispatchToProps = dispatch => bindActionCreators(userActionCreators, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))

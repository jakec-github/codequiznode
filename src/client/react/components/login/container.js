import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { userActionCreators } from '../../../reducers/user'
import Login from './login'

const mapStateToProps = state => ({
  usernameInput: state.user.usernameInput,
  passwordInput: state.user.passwordInput,
})

const mapDispatchToProps = dispatch => bindActionCreators(userActionCreators, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))

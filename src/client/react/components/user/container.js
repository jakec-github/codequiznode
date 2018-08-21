import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { userActionCreators } from '../../../reducers/user'
import User from './user'

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  username: state.user.username,
})

const mapDispatchToProps = dispatch => bindActionCreators(userActionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(User)

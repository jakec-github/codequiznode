import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { userActionCreators } from '../../../reducers/user'
import { mainActionCreators } from '../../../reducers/main'
import Quiz from './quiz'

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
})

const mapDispatchtoProps = dispatch =>
  bindActionCreators({ ...userActionCreators, ...mainActionCreators }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Quiz))

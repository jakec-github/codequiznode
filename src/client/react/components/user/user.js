import React from 'react'
import PropTypes from 'prop-types'

import SignUp from '../signup/container'
import Login from '../login/container'

export default class extends React.Component {
  static propTypes = {
    initiateValidation: PropTypes.func.isRequired,
    handleLogOut: PropTypes.func.isRequired,
    resetInputs: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      authOpen: false,
      authType: 'sign up',

    }
  }

  componentDidMount = () => {
    this.props.initiateValidation()
  }

  handleUserIconClick = () => {
    this.setState({ authOpen: !this.state.authOpen })
  }

  handleEscapeClick = () => {
    this.setState({
      authOpen: false,
    })
    this.props.resetInputs()
  }

  handleTypeClick = (event) => {
    this.setState({ authType: event.target.dataset.type })
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value.replace(' ', '') })
  }

  handleLogOut = () => {
    this.props.handleLogOut()
  }

  render() {
    const icon = this.props.loggedIn ? 'static/img/118-user-check.svg' : 'static/img/114-user.svg'
    return (
      <React.Fragment>
        { this.state.authOpen &&
          <div className="u-full-screen u-cover" onClick={this.handleEscapeClick} />
        }
        <div className="user" id="react-wrapper">
          <img className="user__image" alt="User authentication" src={icon} onClick={this.handleUserIconClick} />
          {this.state.authOpen &&
            <article className="user__auth" id="user-auth">
              <p className="user__escape" id="auth-escape" onClick={this.handleEscapeClick}>X</p>
              {!this.props.loggedIn &&
                <div className="user__auth-box" id="auth-wrapper">
                  <article className="user__auth-type u-margin-top-small" id="type-selector">
                    <div id="sign-up" className={this.state.authType === 'sign up' ? 'user__type-button user__type-button--active' : 'user__type-button'} data-type="sign up" onClick={this.handleTypeClick}>Sign Up</div>
                    <div id="login" className={this.state.authType === 'login' ? 'user__type-button user__type-button--active' : 'user__type-button'} data-type="login" onClick={this.handleTypeClick}>Login</div>
                  </article>
                  {this.state.authType === 'sign up' &&
                    <SignUp />
                  }
                  {this.state.authType === 'login' &&
                    <Login />
                  }
                </div>
              }
              {this.props.loggedIn &&
                <div id="username-wrapper">
                  <p className="user__text u-margin-top-medium" >You are logged in as {this.props.username}</p>
                  <button className="button button--nav u-margin-bottom-medium" onClick={this.handleLogOut}>Log Out</button>
                </div>
              }
            </article>
          }
        </div>
      </React.Fragment>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'

import SignUp from '../signup/container'
import Login from '../login/container'
import Loading from '../loading/loading'
import FetchError from '../fetch_error/fetch_error'

export default class extends React.Component {
  static propTypes = {
    initiateSignUp: PropTypes.func.isRequired,
    initiateLogin: PropTypes.func.isRequired,
    initiateValidation: PropTypes.func.isRequired,
    handleLogOut: PropTypes.func.isRequired,
    resetInputs: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    loadingAuth: PropTypes.bool.isRequired,
    loginError: PropTypes.bool.isRequired,
    invalidLogin: PropTypes.bool.isRequired,
    signupError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.bool.isRequired,
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

  handleEscapeClick = (event) => {
    event.stopPropagation()
    this.setState({
      authOpen: false,
    })
    this.props.resetInputs()
  }

  handleTypeClick = ({ target }) => {
    this.setState({ authType: target.dataset.type })
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value.replace(' ', '') })
  }

  handleLogOut = () => {
    this.props.handleLogOut()
  }

  render() {
    const { authOpen, authType } = this.state
    const {
      initiateSignUp,
      initiateLogin,
      authenticated,
      loadingAuth,
      username,
      loginError,
      invalidLogin,
      signupError,
      errorMessage,
    } = this.props

    return (
      <React.Fragment>
        { authOpen &&
          <div
            className="u-full-screen u-cover"
            onClick={this.handleEscapeClick}
          />
        }
        <div className="user" id="react-wrapper">
          <svg className="user" onClick={this.handleUserIconClick}>
            <use xlinkHref="/sprite.svg#icon-person" />
          </svg>
          { authenticated &&
            <svg
              className="user user--check"
              onClick={this.handleUserIconClick}
            >
              <use xlinkHref="/sprite.svg#icon-check" />
            </svg>
          }
          {authOpen &&
            <article className="user__auth" id="user-auth">
              <p
                className="user__escape"
                id="auth-escape"
                onClick={this.handleEscapeClick}
              >
                X
              </p>
              { loadingAuth &&
                <Loading
                  height={23}
                />
              }
              { ((loginError || signupError) && !loadingAuth) &&
                <FetchError
                  height={23}
                  text={errorMessage}
                  clickable={{
                    clickable: true,
                    func: loginError
                      ? () => initiateLogin()
                      : () => initiateSignUp(),
                  }}
                />
              }
              { (!loadingAuth && !loginError && !signupError) &&
                <React.Fragment>
                  {!authenticated &&
                    <div className="user__auth-box" id="auth-wrapper">
                      <article
                        className="user__auth-type u-margin-top-small"
                        id="type-selector"
                      >
                        <div
                          id="sign-up"
                          className={
                            authType === 'sign up'
                              ? 'user__type-button user__type-button--active'
                              : 'user__type-button'
                            }
                          data-type="sign up"
                          onClick={this.handleTypeClick}
                        >
                          Sign Up
                        </div>
                        <div
                          id="login"
                          className={
                            authType === 'login'
                              ? 'user__type-button user__type-button--active'
                              : 'user__type-button'
                            }
                          data-type="login"
                          onClick={this.handleTypeClick}
                        >
                          Login
                        </div>
                      </article>
                      {authType === 'sign up' &&
                        <SignUp />
                      }
                      {authType === 'login' &&
                        <Login />
                      }
                    </div>
                  }
                  {authenticated &&
                    <div id="username-wrapper">
                      <p className="user__text u-margin-top-medium" >
                        You are logged in as {username}
                      </p>
                      <button
                        className="button button--nav u-margin-bottom-medium"
                        onClick={this.handleLogOut}
                      >
                        Log Out
                      </button>
                    </div>
                  }
                </React.Fragment>
              }
              { (invalidLogin && !loadingAuth && !loginError && !signupError) &&
                <FetchError
                  height={13}
                  text={errorMessage}
                />
              }
            </article>
          }
        </div>
      </React.Fragment>
    )
  }
}

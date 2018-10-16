import React from 'react'
import PropTypes from 'prop-types'

import { MDCTabBar } from '@material/tab-bar'

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
    errorMessage: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      authOpen: false,
      authType: 'sign up',

    }
  }

  componentDidMount = () => {
    const { loadingAuth, signupError, authenticated } = this.props

    this.props.initiateValidation()

    if (
      this.state.authOpen
      && !loadingAuth
      && !signupError
      && !authenticated
    ) {
      const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'))
    }
  }

  componentDidUpdate = () => {
    const { loadingAuth, signupError, authenticated } = this.props

    if (
      this.state.authOpen
      && !loadingAuth
      && !signupError
      && !authenticated
    ) {
      const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'))
    }
  }

  handleUserIconClick = () => {
    this.setState({ authOpen: !this.state.authOpen })
  }

  handleEscapeClick = (event) => {
    event.stopPropagation()
    console.log('clickety click')
    this.setState({
      authOpen: false,
    })
    this.props.resetInputs()
  }

  handleTypeClick = ({ currentTarget }) => {
    this.setState({ authType: currentTarget.dataset.type })
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
            <article className="mdc-card user__auth" id="user-auth">
              <svg
                className="user__escape"
                onClick={this.handleEscapeClick}
              >
                <use xlinkHref="/sprite.svg#icon-close" />
              </svg>
              { loadingAuth &&
                <Loading
                  height={23}
                />
              }
              { (
                  (loginError || signupError)
                  && errorMessage !== 'Username already taken'
                  && !loadingAuth
                ) &&
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
              { (
                  !loadingAuth
                  && !loginError
                  && (!signupError || errorMessage === 'Username already taken')
                ) &&
                <React.Fragment>
                  {!authenticated &&
                    <div className="user__auth-box" id="auth-wrapper">
                      <div className="mdc-tab-bar user__type" role="tablist">
                        <div className="mdc-tab-scroller">
                          <div className="mdc-tab-scroller__scroll-area">
                            <div className="mdc-tab-scroller__scroll-content">
                              <button
                                className={
                                  authType === 'sign up'
                                    ? 'mdc-tab u-medium-font mdc-tab--active'
                                    : 'mdc-tab u-medium-font mdc-tab'
                                }
                                role="tab"
                                aria-selected="true"
                                tabIndex="0"
                                data-type="sign up"
                                onClick={this.handleTypeClick}
                              >
                                <span className="mdc-tab__content">
                                  <span className="mdc-tab__text-label">Sign Up</span>
                                </span>
                                <span
                                  className={
                                    authType === 'sign up'
                                      ? 'mdc-tab-indicator mdc-tab-indicator--active'
                                      : 'mdc-tab-indicator mdc-tab-indicator'
                                  }
                                >
                                  <span
                                    className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"
                                  />
                                </span>
                                <span className="mdc-tab__ripple" />
                              </button>
                              <button
                                className={
                                  authType === 'login'
                                    ? 'mdc-tab u-medium-font mdc-tab--active'
                                    : 'mdc-tab u-medium-font mdc-tab'
                                }
                                role="tab"
                                aria-selected="false"
                                tabIndex="0"
                                data-type="login"
                                onClick={this.handleTypeClick}
                              >
                                <span className="mdc-tab__content">
                                  <span className="mdc-tab__text-label">Login</span>
                                </span>
                                <span
                                  className={
                                    authType === 'login'
                                      ? 'mdc-tab-indicator mdc-tab-indicator--active'
                                      : 'mdc-tab-indicator mdc-tab-indicator'
                                  }
                                >
                                  <span
                                    className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"
                                  />
                                </span>
                                <span className="mdc-tab__ripple" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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
                        You are logged in as<br />{username}
                      </p>
                      <button
                        className="mdc-button mdc-button--raised user__submit u-margin-bottom-small"
                        onClick={this.handleLogOut}
                      >
                        Log Out
                      </button>
                    </div>
                  }
                </React.Fragment>
              }
              { (
                  (invalidLogin || errorMessage === 'Username already taken')
                  && !loadingAuth
                  && !loginError
                  && (!signupError || errorMessage === 'Username already taken')
                ) &&
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

// <article
//   className="user__auth-type u-margin-top-small"
//   id="type-selector"
// >
//   <div
//     id="sign-up"
//     className={
//       authType === 'sign up'
//         ? 'user__type-button user__type-button--active'
//         : 'user__type-button'
//       }
//     data-type="sign up"
//     onClick={this.handleTypeClick}
//   >
//     Sign Up
//   </div>
//   <div
//     id="login"
//     className={
//       authType === 'login'
//         ? 'user__type-button user__type-button--active'
//         : 'user__type-button'
//       }
//     data-type="login"
//     onClick={this.handleTypeClick}
//   >
//     Login
//   </div>
// </article>

import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  // Incorrect details needs to be added
  static propTypes = {
    initiateSignUp: PropTypes.func.isRequired,
    updateInput: PropTypes.func.isRequired,
    usernameInput: PropTypes.string.isRequired,
    passwordInput: PropTypes.string.isRequired,
    confirmPasswordInput: PropTypes.string.isRequired,
  }

  handleSubmitClick = (event) => {
    event.preventDefault()
    this.props.initiateSignUp()
  }

  handleInputChange = ({ target }) => {
    this.props.updateInput(target.id, target.value.replace(' ', ''))
  }

  render() {
    const { usernameInput, passwordInput, confirmPasswordInput } = this.props
    const usernameLength = /^[\da-z]{6,32}$/.test(usernameInput)
    const usernameLetters = /.*[a-z].*[a-z].*/.test(usernameInput)
    const passwordLength = /[A-Za-z\d@$!%*#?&-]{6,32}/.test(passwordInput)
    const passwordMatch = passwordInput === confirmPasswordInput

    let valid = false
    if (
      usernameLength
      && usernameLetters
      && passwordLength
      && passwordMatch
    ) {
      valid = true
    }
    return (
      <form>
        <div className="user__form-group">
          <input
            className="user__input"
            id="usernameInput"
            name="username"
            placeholder="Username"
            onChange={this.handleInputChange}
            value={this.props.usernameInput}
          />
          <label
            htmlFor="usernameInput"
            className="user__label"
          >
            Username
          </label>
        </div>
        <div className="user__form-group">
          <input
            className="user__input"
            id="passwordInput"
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleInputChange}
            value={this.props.passwordInput}
          />
          <label
            htmlFor="passwordInput"
            className="user__label"
          >
            Password
          </label>
        </div>
        <div className="user__form-group">
          <input
            className="user__input"
            id="confirmPasswordInput"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleInputChange}
            value={this.props.confirmPasswordInput}
          />
          <label
            htmlFor="confirmPasswordInput"
            className="user__label"
          >
            Confirm Password
          </label>
        </div>
        { valid &&
          <input
            className="user__submit mdc-button mdc-button--raised"
            name="register"
            onClick={this.handleSubmitClick}
            type="submit"
          />
        }
        { !valid &&
          <ul className="user__validation" id="auth-error">
            <li
              className={usernameLength
                ? 'user__passed'
                : 'user__failed'
              }
            >
              Username must be between 6 and 32 lowercase alphanumeric characters
            </li>
            <li
              className={usernameLetters
                ? 'user__passed'
                : 'user__failed'
              }
            >
              Username must contain at least 2 letters
            </li>
            <li
              className={passwordLength
                ? 'user__passed'
                : 'user__failed'
              }
            >
              Password must be between 6 and 32 characters
            </li>
            <li
              className={passwordMatch
                ? 'user__passed'
                : 'user__failed'
              }
            >
              Passwords must match
            </li>
          </ul>
        }
      </form>
    )
  }
}

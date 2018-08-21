import React from 'react'
import PropTypes from 'prop-types'
// import AuthError from '../common/auth_error'

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
    const { usernameInput, passwordInput, confirmPasswordInput } = this.props

    event.preventDefault()
    if (
      !/^[\da-z]{6,32}$/.test(usernameInput)
      || !/.*[a-z].*[a-z].*/.test(usernameInput)
      || !/[A-Za-z\d@$!%*#?&-]{6,32}/.test(passwordInput)
      || passwordInput !== confirmPasswordInput
    ) {
      console.log(passwordInput)
      console.log(confirmPasswordInput)
      console.log('Invalid username or password')
    } else {
      this.props.initiateSignUp()
    }
  }

  handleInputChange = ({ target }) => {
    console.log('------')
    this.props.updateInput(target.id, target.value.replace(' ', ''))
  }

  render() {
    return (
      <form>
        <div className="user__form-group">
          <input className="user__input" id="usernameInput" name="username" placeholder="Username" onChange={this.handleInputChange} value={this.props.usernameInput} />
          <label htmlFor="usernameInput" className="user__label">Username</label>
        </div>
        <div className="user__form-group">
          <input className="user__input" id="passwordInput" name="password" type="password" placeholder="Password" onChange={this.handleInputChange} value={this.props.passwordInput} />
          <label htmlFor="passwordInput" className="user__label">Password</label>
        </div>
        <div className="user__form-group">
          <input className="user__input" id="confirmPasswordInput" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={this.handleInputChange} value={this.props.confirmPasswordInput} />
          <label htmlFor="confirmPasswordInput" className="user__label">Confirm Password</label>
        </div>
        <input className="user__submit button button--nav" name="register" onClick={this.handleSubmitClick} type="submit" />

      </form>
    )
  }
}

// <AuthError
//   usernameLength={!/^[\da-z]{6,32}$/.test(username)}
//   usernameLetters={!/.*[a-z].*[a-z].*/.test(username)}
//   passwordLength={!/[A-Za-z\d@$!%*#?&-]{6,32}/.test(password)}
//   passwordMatch={password !== confirmPassword}
//   incorrectDetails={false}
// />

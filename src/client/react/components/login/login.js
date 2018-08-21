import React from 'react'
import PropTypes from 'prop-types'
// import AuthError from '../common/auth_error'

export default class extends React.Component {
  static propTypes = {
    initiateLogin: PropTypes.func.isRequired,
    updateInput: PropTypes.func.isRequired,
    usernameInput: PropTypes.string.isRequired,
    passwordInput: PropTypes.string.isRequired,
    // loginError: PropTypes.bool.isRequired,
  }

  handleSubmitClick = (event) => {
    event.preventDefault()
    this.props.initiateLogin()
  }

  handleInputChange = ({ target }) => {
    this.props.updateInput(target.id, target.value.replace(' ', ''))
  }

  render() {
    console.log(this.props)
    return (
      <form>
        <div className="user__form-group">
          <input className="user__input" name="username" id="usernameInput" placeholder="Username" onChange={this.handleInputChange} value={this.props.usernameInput} />
          <label htmlFor="usernameInput" className="user__label">Username</label>
        </div>
        <div className="user__form-group">
          <input className="user__input" id="passwordInput" name="password" type="password" placeholder="Password" onChange={this.handleInputChange} value={this.props.passwordInput} />
          <label htmlFor="passwordInput" className="user__label">Password</label>
        </div>
        <input className="user__submit button button--nav" name="login" onClick={this.handleSubmitClick} type="submit" />
      </form>
    )
  }
}

// <AuthError
//   usernameLength={false}
//   usernameLetters={false}
//   passwordLength={false}
//   passwordMatch={false}
//   incorrectDetails={loginError}
// />

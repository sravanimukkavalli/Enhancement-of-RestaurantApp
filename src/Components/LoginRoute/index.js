import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  handleLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    try {
      const api = 'https://apis.ccbp.in/login'
      const userDetails = {username, password}
      const options = {method: 'POST', body: JSON.stringify(userDetails)}
      const response = await fetch(api, options)
      const data = await response.json()
      if (response.ok) {
        const authToken = data.jwt_token
        const {history} = this.props
        Cookies.set('jwt_token', authToken, {expires: 30})
        history.replace('/')
      } else {
        this.setState({errorMsg: data.error_msg})
      }
    } catch (error) {
      this.setState({errorMsg: 'Something went wrong. Please try again.'})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const authToken = Cookies.get('jwt_token')
    if (authToken) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <form className="container" onSubmit={this.handleLogin}>
          <h2>Login</h2>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={this.onChangeUsername}
          />
          <br />
          <label htmlFor="psd">Password</label>
          <input
            id="psd"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
          />
          <br />
          <button type="submit">Login</button>
          {errorMsg && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginRoute

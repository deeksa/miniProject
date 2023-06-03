import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorDisplay: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onTapLogin = async event => {
    event.preventDefault()
    const {password, username} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 1})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMessage = data.error_msg
      this.setState({errorDisplay: errorMessage})
    }
  }

  render() {
    const {password, username, errorDisplay} = this.state
    return (
      <div className="container1">
        <div className="container2">
          <img
            src="https://res.cloudinary.com/dywufvi3m/image/upload/v1685347383/Layer_2login_pdsmll.png"
            alt="loginImage"
          />
          <div className="container3">
            <div className="container5">
              <img
                src="https://res.cloudinary.com/dywufvi3m/image/upload/v1685347649/Standard_Collection_8logo_osogfd.png"
                alt="logo"
              />
              <h1>Insta Share</h1>
            </div>
            <div className="container4">
              <form onSubmit={this.onTapLogin}>
                <label>
                  USERNAME
                  <br />
                  <input
                    type="text"
                    className="label1"
                    onChange={this.onChangeUserName}
                    value={username}
                  />
                </label>
                <br />
                <label>
                  PASSWORD
                  <br />
                  <input
                    type="password"
                    className="label1"
                    onChange={this.onChangePassword}
                    value={password}
                  />
                </label>
                <br />
                {errorDisplay === '' ? null : <p>{errorDisplay}</p>}
                <button type="submit" className="button1">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginPage

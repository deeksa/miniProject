import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'

class Header extends Component {
  state = {
    inputValue: '',
  }

  onTapLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history('/login')
  }

  onChangeInput = e => {
    this.setState({inputValue: e.target.value})
  }

  onTapSearch = () => {
    const {inputValue} = this.state
    const {onTapSearchButton} = this.props
    onTapSearchButton(inputValue)
  }

  render() {
    const {inputValue} = this.state
    return (
      <div className="headerContainer">
        <div className="headerLogoContainer">
          <img
            src="https://res.cloudinary.com/dywufvi3m/image/upload/v1685347649/Standard_Collection_8logo_osogfd.png"
            alt="logo"
            className="headerLogoImage"
          />
          <h1>Insta Share</h1>
        </div>
        <div className="headerTabs">
          <div className="searchContainer">
            <input
              type="input"
              onChange={this.onChangeInput}
              value={inputValue}
            />
            <button type="button" onClick={this.onTapSearch}>
              <FaSearch size={10} />
            </button>
          </div>
          <Link to="/" className="links">
            Home
          </Link>
          <Link to="/my-profile" className="links">
            Profile
          </Link>
          <button type="button" onClick={this.onTapLogout} className="links">
            Logout
          </button>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)

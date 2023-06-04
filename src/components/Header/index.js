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
    history.replace('/login')
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
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dywufvi3m/image/upload/v1685347649/Standard_Collection_8logo_osogfd.png"
              alt="website logo"
              className="headerLogoImage"
            />
          </Link>
          <h1>Insta Share</h1>
        </div>
        <div className="headerTabs">
          <div className="searchContainer">
            <input
              type="search"
              onChange={this.onChangeInput}
              value={inputValue}
              placeholder="Search Caption"
            />
            <button
              type="button"
              onClick={this.onTapSearch}
              testid="searchIcon"
            >
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

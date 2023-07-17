import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {FaSuitcase} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website-logo"
          className="header-logo"
        />
      </Link>
      <div className="menu-container-browser">
        <Link to="/" className="menu-nav">
          <p className="menu">Home</p>
        </Link>
        <Link to="/jobs" className="menu-nav">
          <p className="menu">Jobs</p>
        </Link>
      </div>
      <button type="button" className="logout-button" onClick={onLogout}>
        Logout
      </button>
      <div className="menu-container">
        <Link to="/">
          <AiFillHome className="icon" />
        </Link>
        <Link to="/jobs">
          <FaSuitcase className="icon" />
        </Link>
        <FiLogOut className="icon" onClick={onLogout} />
      </div>
    </nav>
  )
}

export default withRouter(Header)

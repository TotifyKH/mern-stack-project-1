import "../css/header.css";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>ARCAVE</h1>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
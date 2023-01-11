import "../css/header.css";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect,useState } from "react";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/users/status`, { withCredentials: true })
    .then((result) => {
      if(result.data.isLoggedIn){
        setIsLoggedIn(true);
      }
    })
  }, [])

  const handleClick = async () => {
    //Go back to home page
    axios.get(`${API_URL}/users/logout`, {withCredentials: true})
    .then((result) => {
      if(result.data.success){
        navigate('/');
      }else{
        console.log('error logging out');
      }
    })
  }

  return (
    <header>
      <h1><Link onClick={() => {window.location.href="/"}}>ARCAVE</Link></h1>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          {isLoggedIn ? 
            (<li><Link onClick={handleClick}>Logout</Link></li>)
            : 
            (<li><Link to='/login'>Enter-Name</Link></li>) 
          }
   
        </ul>
      </nav>
    </header>
  )
}

export default Header;
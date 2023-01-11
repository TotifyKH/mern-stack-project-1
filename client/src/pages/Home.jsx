import '../css/home.css'
import '../css/layout.css'
import { useEffect,useState } from "react";
import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/users/status`, { withCredentials: true })
    .then((result) => {
      if(result.data.isLoggedIn){
        setIsLoggedIn(true);
        setName(result.data.name);
      }
    })
  }, [])

  return (
    <>
    <div className="default-container">
      {isLoggedIn ? 
      (<h1>Welcome, {name}</h1>)
      :
      (<h1>Welcome To Arcave</h1>)  
      }
      
      <div className='game-container'>
        <div className='game-item'>
          <h4>Flappy Bird</h4>
          <button onClick={() => {window.location.href="/games/flappyBird"}}>Play</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
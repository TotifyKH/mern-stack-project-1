import '../css/home.css'
import '../css/layout.css'
//import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <>
    <div className="default-container">
      <h1>Welcome To Arcave</h1>
      
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
import '../../css/layout.css';
import {useEffect} from 'react';


const FlappyBird = () => {
  useEffect(() => {
    import('./flappyBird.script');
  }, []);

  return (
    <>
    <div className='default-container'>
      <h1>This is the Flappy Bird Game</h1>
      <button id='myButton'>Click Here</button>
    </div>
    </>
  )
}


export default FlappyBird
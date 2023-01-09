import '../../css/layout.css';
import './flappyBird.css';
import {useEffect} from 'react';


const FlappyBird = () => {
  useEffect(() => {
    import('./main');
  }, []);

  return (
    <>
    <div className='leaderboard-container'>
      <canvas className='canvas-item' id='flappyBird-canvas'></canvas>
      <h1 className='leaderboard-item'>LeaderBoard</h1>
    </div>
    
    </>
  )
}


export default FlappyBird
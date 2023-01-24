import '../../css/layout.css';
import './pong2.css';
import {useEffect} from 'react';

const Pong2 = () => {

  useEffect(() => {
    import('./main');
  },[])

  return (
    <>
    <div className='leaderboard-container'>
      <div className='leaderboard-item'>
        <input type='text' placeholder='gameId'></input>
        <div>
        <button id='create-pong2-room'>Create Game</button>
        <button id='join-pong2-room'>Join Game</button>
        </div>
      </div>
      <canvas className='canvas-item' id='pong2-canvas'></canvas>  
    </div>
    
    </>
  )
}


export default Pong2
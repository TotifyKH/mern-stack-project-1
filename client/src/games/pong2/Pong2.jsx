import '../../css/layout.css';
import './pong2.css';
import { useEffect } from 'react';

const Pong2 = () => {

  useEffect(() => {
    import('./main');
  }, [])

  return (
    <>
      <div className='leaderboard-container'>
        <div className='leaderboard-item'>
          <div id='pong2-room'>
            <h2 id='pong2-room-number'> Hello </h2>
            <button id='leave-pong2-room'>Leave Game</button>
          </div>
          <div id='pong2-button'>
            <input type='text' placeholder='gameId' id='pong2-roomId'></input>
            <div>
              <button id='create-pong2-room'>Create Game</button>
              <button id='join-pong2-room'>Join Game</button>
            </div>
          </div>

        </div>
        <canvas className='canvas-item' id='pong2-canvas'></canvas>
      </div>

    </>
  )
}


export default Pong2
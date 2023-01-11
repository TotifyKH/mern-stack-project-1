import '../../css/layout.css';
import './flappyBird.css';
import {useEffect, useState} from 'react';
import Leaderboard from '../../components/Leaderboard';
import axios from 'axios';
import io from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL;

const socket = io.connect(`${API_URL}`);

const FlappyBird = () => {


  const [scoreData, setScoreData] = useState([{name:'Player1', score:0}]);

  const updateLeaderboardData = async() => {
    axios.get(`${API_URL}/games/flappyBird/getTopScores`)
    .then((results) => {
      setScoreData(results.data);
    })
  }

  useEffect(() => {
    import('./main');
    updateLeaderboardData();
  }, []);

  useEffect(() => {
    socket.on('update-flappy-bird-score', async() => {
      updateLeaderboardData();
      console.log('socket listened');
    })
  }, [socket])

  return (
    <>
    <div className='leaderboard-container'>
      <canvas className='canvas-item' id='flappyBird-canvas'></canvas>
      <div className='leaderboard-item'>
        <h1 id='flappyBird-leaderboard'>LeaderBoard</h1>
        <Leaderboard data={scoreData}/>
      </div>
      
    </div>
    
    </>
  )
}


export default FlappyBird
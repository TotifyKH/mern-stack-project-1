import '../../css/layout.css';
import './flappyBird.css';
import {useEffect, useState} from 'react';
import Leaderboard from '../../components/Leaderboard';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


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
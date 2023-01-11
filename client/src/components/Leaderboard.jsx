import React from 'react';
import '../css/leaderboard.css';

const LeaderboardTable = ({data}) => {
  return (
    <table className='leaderboard-table'>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({_id, name, score}, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;

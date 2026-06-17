import { useEffect, useState } from 'react';
import { apiEndpoints, fetchData } from '../api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(apiEndpoints.leaderboard)
      .then(setLeaderboard)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading leaderboard...</p></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error.message}</div>;

  return (
    <div className="container mt-5">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.rank}</td>
              <td>{entry.user?.name || 'N/A'}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

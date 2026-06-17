import { useEffect, useState } from 'react';
import { fetchData } from '../api';

const getApiUrl = () => {
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    const codespace = window.location.hostname.split('-')[0];
    return `https://${codespace}-8000.app.github.dev/api/teams/`;
  }
  return `http://localhost:8000/api/teams/`;
};

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(getApiUrl())
      .then(setTeams)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading teams...</p></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error.message}</div>;

  return (
    <div className="container mt-5">
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.owner?.name || 'N/A'}</td>
              <td>{team.members?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

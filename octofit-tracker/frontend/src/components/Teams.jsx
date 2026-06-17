import { useEffect, useState } from 'react';
import { apiEndpoints, fetchData } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(apiEndpoints.teams)
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

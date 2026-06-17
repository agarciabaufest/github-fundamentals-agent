import { useEffect, useState } from 'react';
import { fetchData } from '../api';

const ENDPOINT = '/api/workouts/';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(`http://${window.location.hostname}:8000${ENDPOINT}`)
      .then(setWorkouts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading workouts...</p></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error.message}</div>;

  return (
    <div className="container mt-5">
      <h2>Workouts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Title</th>
            <th>Level</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.user?.name || 'N/A'}</td>
              <td>{workout.title}</td>
              <td>{workout.suggestedForLevel}</td>
              <td>{workout.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

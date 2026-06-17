import { useEffect, useState } from 'react';
import { fetchData } from '../api';

const ENDPOINT = '/api/activities/';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(`http://${window.location.hostname}:8000${ENDPOINT}`)
      .then(setActivities)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading activities...</p></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error.message}</div>;

  return (
    <div className="container mt-5">
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.user?.name || 'N/A'}</td>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes}</td>
              <td>{activity.caloriesBurned}</td>
              <td>{new Date(activity.performedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

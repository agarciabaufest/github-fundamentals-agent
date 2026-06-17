/**
 * API Configuration for OctoFit Tracker
 * 
 * Requires `VITE_CODESPACE_NAME` environment variable for Codespaces deployment.
 * Define it in `.env.local` for local development with Codespaces:
 * 
 *   VITE_CODESPACE_NAME=your-codespace-name
 * 
 * If undefined, falls back to localhost:8000 for local development.
 */

export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';
};

const apiBaseUrl = getApiBaseUrl();

export const apiEndpoints = {
  users: `${apiBaseUrl}/users`,
  teams: `${apiBaseUrl}/teams`,
  activities: `${apiBaseUrl}/activities`,
  leaderboard: `${apiBaseUrl}/leaderboard`,
  workouts: `${apiBaseUrl}/workouts`,
};

export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : data.data || [];
};

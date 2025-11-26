import { useEffect, useState } from 'react';
import './App.css';


interface SystemStatus {
  status: string;
  system: string;
  version: string;
}

function App() {
  const [statusData, setStatusData] = useState<SystemStatus | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:8080/api/status')
      .then(response => {
        if (!response.ok) {
          throw new Error('Błąd połączenia z API');
        }
        return response.json();
      })
      .then(data => setStatusData(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard KSeF Validator</h1>

      <div style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        background: '#1a1a1a', // Ciemne tło dla kontrastu
        color: 'white'
      }}>
        <h2>Status Backend:</h2>

        {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

        {!statusData && !error && <p>Łączenie z serwerem...</p>}

        {statusData && (
          <ul>
            <li><strong>System:</strong> {statusData.system}</li>
            <li><strong>Wersja:</strong> {statusData.version}</li>
            <li>
              <strong>Status: </strong>
              <span style={{ color: '#4caf50', fontWeight: 'bold' }}>
                {statusData.status}
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
import MapView from '../components/MapView';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1000,
          padding: '10px 16px',
          backgroundColor: '#e63946',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Sign Out
      </button>

      {/* Main Map View */}
      <MapView />
    </div>
  );
};

export default Home;

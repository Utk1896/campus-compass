import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>Login</button>

      {/* Link to the signup page */}
      <p style={styles.signupText}>
        Don't have an account? <Link to="/signup" style={styles.signupLink}>Sign up here</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '0 20px',
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    maxWidth: '400px',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  signupText: {
    marginTop: '20px',
    fontSize: '1rem',
  },
  signupLink: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  },
};

export default Login;

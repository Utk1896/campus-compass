import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await API.post('/auth/signup', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <div style={{ width: '300px', margin: '0 auto', padding: '20px' }}>
      <h2>Signup</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <button onClick={handleSignup} style={{ width: '100%', padding: '10px' }}>
        Signup
      </button>
    </div>
  );
};

export default Signup;

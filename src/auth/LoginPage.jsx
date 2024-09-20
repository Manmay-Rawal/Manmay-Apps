import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';  // Import the CSS file

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

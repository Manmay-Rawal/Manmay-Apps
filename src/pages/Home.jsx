import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Navigate to the login page when the Login button is clicked
  };

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Employee List App</div>
        <div className="navbar-links">
          <button className="nav-btn" onClick={handleLogin}>Login</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        <h1>Welcome to Employee List</h1>
      </div>
    </div>
  );
}

export default Home;

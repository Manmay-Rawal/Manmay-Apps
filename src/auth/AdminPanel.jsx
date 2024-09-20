import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';  // Import the CSS file

function AdminPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic
    navigate('/login');
  };

  return (
    <div className="admin-panel">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Admin Panel</div>
        <div className="navbar-links">
          <button className="nav-btn" onClick={() => navigate('/')}>Home</button>
          <button className="nav-btn" onClick={() => navigate('/employee-list')}>Employee List</button>
          <button className="nav-btn create-btn" onClick={() => navigate('/Add-employee')}>Add Employee</button>
          <button className="nav-btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        <h1>Welcome to the Admin Panel</h1>
      </div>
      <div className='content'>
        <p>You have successfully logged in as admin!</p>
      </div>
    </div>
  );
}

export default AdminPanel;

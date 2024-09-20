import React, { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import './EmployeeList.css';  // Assuming this has the table CSS
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const { employees, deleteEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();

  // Handle edit action
  const handleEdit = (employee) => {
    navigate('/Add-employee', { state: { employee } });  // Pass employee data to CreateEmployee component
  };

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
    }
  };


  const handleLogout = () => {
    // Handle logout logic
    navigate('/login');
  };

  return (
    <>
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

      {/* EmployeeList */}
    <div className="employee-list">
      <h1>Employee List</h1>
      {employees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Courses</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.courses.join(', ')}</td>
                <td>
                  {employee.image && (
                    <img src={employee.image} alt={employee.name} width="50" height="50" />
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                  <button onClick={() => handleDelete(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-employees">No employees found</p>
      )}
    </div>
    
    </>
  );
}

export default EmployeeList;

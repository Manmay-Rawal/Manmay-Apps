import React, { useState, useContext, useEffect } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import { useLocation } from 'react-router-dom';
import './AddEmployee.css';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const { addOrUpdateEmployee } = useContext(EmployeeContext);
  const location = useLocation(); // Access passed state for editing
  const employeeToEdit = location.state?.employee; // Get the employee passed via edit button

  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: ''
  });

  const [error, setError] = useState('');

  // Prepopulate the form if editing an employee
  useEffect(() => {
    if (employeeToEdit) {
      setForm(employeeToEdit);
    }
  }, [employeeToEdit]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm((prevForm) => ({
        ...prevForm,
        courses: [...prevForm.courses, value],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        courses: prevForm.courses.filter((course) => course !== value),
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for duplicate email if not editing the same employee
    if (localStorage.getItem('employees')) {
      const savedEmployees = JSON.parse(localStorage.getItem('employees'));
      const duplicateEmail = savedEmployees.find(
        (emp) => emp.email === form.email && emp.id !== form.id
      );
      if (duplicateEmail) {
        setError('Email already exists');
        return;
      }
    }

    addOrUpdateEmployee(form); // Add or update employee
    setError('');
  };

  
  const navigate = useNavigate();
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

    {/* Create-employee */}
    <div className="Add-employee">
      <form className="employee-form" onSubmit={handleSubmit}>
        <h1>{form.id ? 'Edit Employee' : 'Add Employee'}</h1>
        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Designation</label>
          <select name="designation" value={form.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Salesman">Salesman</option>
            <option value="Worker">Worker</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} /> Male
          <input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} /> Female
        </div>

        <div className="form-group">
          <label>Courses</label>
          <input type="checkbox" name="courses" value="React" checked={form.courses.includes('React')} onChange={handleCheckboxChange} /> React
          <input type="checkbox" name="courses" value="Angular" checked={form.courses.includes('Angular')} onChange={handleCheckboxChange} /> Angular
          <input type="checkbox" name="courses" value="Vue" checked={form.courses.includes('Vue')} onChange={handleCheckboxChange} /> Vue
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" name="image" accept="image/png, image/jpeg" onChange={(e) => setForm({ ...form, image: URL.createObjectURL(e.target.files[0]) })} />
        </div>

        <button type="submit" className="submit-btn">{form.id ? 'Update Employee' : 'Create Employee'}</button>
      </form>
    </div>
    </>
  );
}

export default AddEmployee;

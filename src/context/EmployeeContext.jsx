import React, { useState, useEffect, createContext } from 'react';

// Create a Context for Employee data
export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  // Load employees from localStorage when the component mounts
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  // Function to add or update an employee
  const addOrUpdateEmployee = (employee) => {
    setEmployees((prevEmployees) => {
      const existingEmployeeIndex = prevEmployees.findIndex((emp) => emp.id === employee.id);
      
      let updatedEmployees;

      if (existingEmployeeIndex !== -1) {
        // If employee exists, update the employee
        updatedEmployees = [...prevEmployees];
        updatedEmployees[existingEmployeeIndex] = employee;
      } else {
        // If employee does not exist, add a new one
        updatedEmployees = [...prevEmployees, { ...employee, id: Date.now() }]; // Add unique ID using Date.now()
      }

      localStorage.setItem('employees', JSON.stringify(updatedEmployees)); // Save to localStorage
      return updatedEmployees;
    });
  };

  // Function to delete an employee
  const deleteEmployee = (id) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = prevEmployees.filter((emp) => emp.id !== id);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees)); // Save to localStorage
      return updatedEmployees;
    });
  };

  return (
    <EmployeeContext.Provider value={{ employees, addOrUpdateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

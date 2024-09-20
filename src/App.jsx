import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './auth/AdminPanel';  // Update the path if needed
import Home from './pages/Home';  // Example Home component
import EmployeeList from './component/EmployeeList';  // Example EmployeeList component
import AddEmployee from './component/AddEmployee';  // Example CreateEmployee component
import LoginPage from './auth/LoginPage';  // Example Login component
import { EmployeeProvider } from './context/EmployeeContext'; 

function App() {
  return (
    <EmployeeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/Add-employee" element={<AddEmployee />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
    </EmployeeProvider>
  );
}

export default App;

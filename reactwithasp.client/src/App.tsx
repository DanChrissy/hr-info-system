import './App.css';
import MainLayout from './components/layout/MainLayout';
import { Routes, Route } from 'react-router-dom';
import EmployeeList from './employee/list';
import ReportList from './report/list';
import Login from './auth/login';
import ProtectedRoute from './components/route/ProtectedRoute';
import RouteManager from './components/route/RouteManager';
import EmployeePage from './employee/manage';
import NotFound from './NotFound';

function App() {

  return (
    <MainLayout>
      <RouteManager />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute>
              <EmployeePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/create"
          element={
            <ProtectedRoute>
              <EmployeePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

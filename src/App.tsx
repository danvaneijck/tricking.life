import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/ui/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SubmitEventPage from './pages/SubmitEventPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import AdminRoute from './components/auth/AdminRoute';
import DashboardPage from './pages/admin/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route
              path="/submit-event"
              element={
                <ProtectedRoute>
                  <SubmitEventPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <DashboardPage />
                </AdminRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>

  );
}

export default App;
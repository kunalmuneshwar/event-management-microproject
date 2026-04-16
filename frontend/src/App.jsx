import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminLoginPage from './pages/auth/AdminLoginPage'
import AdminSignupPage from './pages/auth/AdminSignupPage'
import UserLoginPage from './pages/auth/UserLoginPage'
import UserSignupPage from './pages/auth/UserSignupPage'
import LandingPage from './pages/common/LandingPage'
import NotFoundPage from './pages/common/NotFoundPage'
import UserDashboardPage from './pages/user/UserDashboardPage'
import UserEventDetailsPage from './pages/user/UserEventDetailsPage'
import UserEventsPage from './pages/user/UserEventsPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/signup" element={<AdminSignupPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route path="/user/login" element={<UserLoginPage />} />
      <Route path="/user/signup" element={<UserSignupPage />} />
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute allowedRole="user">
            <UserDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/events"
        element={
          <ProtectedRoute allowedRole="user">
            <UserEventsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/events/:eventId"
        element={
          <ProtectedRoute allowedRole="user">
            <UserEventDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App

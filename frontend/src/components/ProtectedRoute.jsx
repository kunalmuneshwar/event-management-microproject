import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const ProtectedRoute = ({ allowedRole, children }) => {
  const { authState, isAuthenticated, isBootstrapping } = useAuth()

  if (isBootstrapping) {
    return <div className="center-state">Loading session...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to={`/${allowedRole}/login`} replace />
  }

  if (authState.user?.role !== allowedRole) {
    return <Navigate to={`/${authState.user?.role || 'user'}/dashboard`} replace />
  }

  return children
}

export default ProtectedRoute

import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthForm'
import { useAuth } from '../../context/useAuth'

const AdminLoginPage = () => {
  const navigate = useNavigate()
  const { loginWithRole, isAuthenticated, authState } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated && authState.user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await loginWithRole('admin', formData)
      navigate('/admin/dashboard')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to login as admin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthForm
      heading="Admin Login"
      submitText="Login"
      onSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      isSubmitting={isSubmitting}
      error={error}
      footer={
        <>
          New admin? <Link to="/admin/signup">Create account</Link>
        </>
      }
    />
  )
}

export default AdminLoginPage

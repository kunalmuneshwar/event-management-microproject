import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthForm'
import { useAuth } from '../../context/useAuth'

const AdminSignupPage = () => {
  const navigate = useNavigate()
  const { signupWithRole, isAuthenticated, authState } = useAuth()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
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
      await signupWithRole('admin', formData)
      navigate('/admin/dashboard')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to signup as admin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthForm
      heading="Admin Signup"
      submitText="Create admin account"
      includeName
      onSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      isSubmitting={isSubmitting}
      error={error}
      footer={
        <>
          Already have an account? <Link to="/admin/login">Login</Link>
        </>
      }
    />
  )
}

export default AdminSignupPage

import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthForm'
import { useAuth } from '../../context/useAuth'

const UserSignupPage = () => {
  const navigate = useNavigate()
  const { signupWithRole, isAuthenticated, authState } = useAuth()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated && authState.user?.role === 'user') {
    return <Navigate to="/user/dashboard" replace />
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
      await signupWithRole('user', formData)
      navigate('/user/dashboard')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to signup as user.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthForm
      heading="User Signup"
      submitText="Create user account"
      includeName
      onSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      isSubmitting={isSubmitting}
      error={error}
      footer={
        <>
          Already have an account? <Link to="/user/login">Login</Link>
        </>
      }
    />
  )
}

export default UserSignupPage

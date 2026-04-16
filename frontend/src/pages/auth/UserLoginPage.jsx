import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthForm'
import { useAuth } from '../../context/useAuth'

const UserLoginPage = () => {
  const navigate = useNavigate()
  const { loginWithRole, isAuthenticated, authState } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
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
      await loginWithRole('user', formData)
      navigate('/user/dashboard')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to login as user.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthForm
      heading="User Login"
      submitText="Login"
      onSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      isSubmitting={isSubmitting}
      error={error}
      footer={
        <>
          New user? <Link to="/user/signup">Create account</Link>
        </>
      }
    />
  )
}

export default UserLoginPage

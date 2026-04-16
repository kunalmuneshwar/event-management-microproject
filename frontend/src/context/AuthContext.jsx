import { useEffect, useState } from 'react'
import { getCurrentUser, login, signup } from '../services/authService'
import { authContext as AuthContext } from './authContextInstance'

const AUTH_STORAGE_KEY = 'ems_auth'

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const rawAuth = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!rawAuth) {
      return {
        token: null,
        user: null,
      }
    }

    try {
      return JSON.parse(rawAuth)
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return {
        token: null,
        user: null,
      }
    }
  })

  const [isBootstrapping, setIsBootstrapping] = useState(true)

  const persistAuth = (nextAuth) => {
    setAuthState(nextAuth)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth))
  }

  const clearAuth = () => {
    const emptyState = {
      token: null,
      user: null,
    }
    setAuthState(emptyState)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const loginWithRole = async (role, payload) => {
    const data = await login(role, payload)
    persistAuth({ token: data.token, user: data.user })
    return data.user
  }

  const signupWithRole = async (role, payload) => {
    const data = await signup(role, payload)
    persistAuth({ token: data.token, user: data.user })
    return data.user
  }

  useEffect(() => {
    const token = authState?.token

    const bootstrap = async () => {
      if (!token) {
        setIsBootstrapping(false)
        return
      }

      try {
        const data = await getCurrentUser()
        persistAuth({ token, user: data.user })
      } catch {
        clearAuth()
      } finally {
        setIsBootstrapping(false)
      }
    }

    bootstrap()
  }, [authState?.token])

  const value = {
    authState,
    isAuthenticated: Boolean(authState?.token),
    isBootstrapping,
    loginWithRole,
    signupWithRole,
    logout: clearAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

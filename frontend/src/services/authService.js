import api from './api'

export const signup = async (role, payload) => {
  const { data } = await api.post(`/auth/${role}/signup`, payload)
  return data
}

export const login = async (role, payload) => {
  const { data } = await api.post(`/auth/${role}/login`, payload)
  return data
}

export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me')
  return data
}

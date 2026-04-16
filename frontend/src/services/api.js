import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const rawAuth = localStorage.getItem('ems_auth')

  if (rawAuth) {
    try {
      const parsedAuth = JSON.parse(rawAuth)
      if (parsedAuth?.token) {
        config.headers.Authorization = `Bearer ${parsedAuth.token}`
      }
    } catch {
      localStorage.removeItem('ems_auth')
    }
  }

  return config
})

export default api

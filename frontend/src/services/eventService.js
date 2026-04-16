import api from './api'

export const getAllEvents = async () => {
  const { data } = await api.get('/events')
  return data.events
}

export const getEventById = async (eventId) => {
  const { data } = await api.get(`/events/${eventId}`)
  return data
}

export const registerForEvent = async (eventId) => {
  const { data } = await api.post(`/events/${eventId}/register`)
  return data
}

export const getAdminDashboard = async () => {
  const { data } = await api.get('/admin/dashboard')
  return data
}

export const getAdminEvents = async () => {
  const { data } = await api.get('/admin/events')
  return data.events
}

export const createAdminEvent = async (payload) => {
  const { data } = await api.post('/admin/events', payload)
  return data.event
}

export const updateAdminEvent = async (eventId, payload) => {
  const { data } = await api.put(`/admin/events/${eventId}`, payload)
  return data.event
}

export const deleteAdminEvent = async (eventId) => {
  const { data } = await api.delete(`/admin/events/${eventId}`)
  return data
}

export const getEventRequests = async (eventId) => {
  const { data } = await api.get(`/admin/events/${eventId}/requests`)
  return data.registrations
}

export const decideEventRequest = async (registrationId, decision) => {
  const { data } = await api.patch(`/admin/registrations/${registrationId}/decision`, {
    decision,
  })
  return data.registration
}

export const getUserDashboard = async () => {
  const { data } = await api.get('/user/dashboard')
  return data
}

export const getMyRegistrations = async () => {
  const { data } = await api.get('/user/registrations')
  return data.registrations
}

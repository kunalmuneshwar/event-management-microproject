import { useEffect, useMemo, useState } from 'react'
import AppShell from '../../components/AppShell'
import EventForm from '../../components/EventForm'
import {
  createAdminEvent,
  decideEventRequest,
  deleteAdminEvent,
  getAdminDashboard,
  getAdminEvents,
  getEventRequests,
  updateAdminEvent,
} from '../../services/eventService'

const emptyForm = {
  name: '',
  shortDescription: '',
  date: '',
  tags: '',
  visibility: 'open',
}

const toInputDateTime = (value) => {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  const offset = date.getTimezoneOffset()
  const localDate = new Date(date.getTime() - offset * 60_000)
  return localDate.toISOString().slice(0, 16)
}

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null)
  const [events, setEvents] = useState([])
  const [eventForm, setEventForm] = useState(emptyForm)
  const [editingEventId, setEditingEventId] = useState(null)
  const [selectedEventId, setSelectedEventId] = useState('')
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const selectedEvent = useMemo(
    () => events.find((item) => item._id === selectedEventId),
    [events, selectedEventId],
  )

  const loadDashboard = async () => {
    const [dashboardData, eventData] = await Promise.all([
      getAdminDashboard(),
      getAdminEvents(),
    ])

    setStats(dashboardData.stats)
    setEvents(eventData)
  }

  const loadRequests = async (eventId) => {
    if (!eventId) {
      setRequests([])
      return
    }

    const data = await getEventRequests(eventId)
    setRequests(data)
  }

  useEffect(() => {
    const boot = async () => {
      try {
        setError('')
        await loadDashboard()
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load admin dashboard.')
      } finally {
        setIsLoading(false)
      }
    }

    boot()
  }, [])

  useEffect(() => {
    loadRequests(selectedEventId).catch((requestError) => {
      setError(requestError.response?.data?.message || 'Unable to load participant requests.')
    })
  }, [selectedEventId])

  const handleFormChange = (event) => {
    setEventForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const resetForm = () => {
    setEventForm(emptyForm)
    setEditingEventId(null)
  }

  const handleEventSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSaving(true)

    const payload = {
      ...eventForm,
      date: new Date(eventForm.date).toISOString(),
    }

    try {
      if (editingEventId) {
        await updateAdminEvent(editingEventId, payload)
      } else {
        await createAdminEvent(payload)
      }

      await loadDashboard()
      resetForm()
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to save event.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (event) => {
    setEditingEventId(event._id)
    setEventForm({
      name: event.name,
      shortDescription: event.shortDescription,
      date: toInputDateTime(event.date),
      tags: (event.tags || []).join(', '),
      visibility: event.visibility,
    })
  }

  const handleDelete = async (eventId) => {
    const shouldDelete = window.confirm('Delete this event?')
    if (!shouldDelete) {
      return
    }

    try {
      setError('')
      await deleteAdminEvent(eventId)
      if (selectedEventId === eventId) {
        setSelectedEventId('')
      }
      await loadDashboard()
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to delete event.')
    }
  }

  const handleDecision = async (registrationId, decision) => {
    try {
      setError('')
      await decideEventRequest(registrationId, decision)
      await Promise.all([loadDashboard(), loadRequests(selectedEventId)])
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to update request status.')
    }
  }

  return (
    <AppShell role="admin" title="Admin Dashboard">
      {error ? <p className="error-text">{error}</p> : null}

      {isLoading ? <p>Loading dashboard...</p> : null}

      {!isLoading && stats ? (
        <section className="stats-grid">
          <article className="stat-card">
            <h2>{stats.totalEvents}</h2>
            <p>Total Events</p>
          </article>
          <article className="stat-card">
            <h2>{stats.privateEvents}</h2>
            <p>Private Events</p>
          </article>
          <article className="stat-card">
            <h2>{stats.openEvents}</h2>
            <p>Open Events</p>
          </article>
          <article className="stat-card">
            <h2>{stats.pendingRequests}</h2>
            <p>Pending Requests</p>
          </article>
        </section>
      ) : null}

      <section className="split-grid">
        <article className="panel">
          <h2>{editingEventId ? 'Update Event' : 'Create Event'}</h2>
          <EventForm
            formData={eventForm}
            onChange={handleFormChange}
            onSubmit={handleEventSubmit}
            onCancel={editingEventId ? resetForm : null}
            submitText={editingEventId ? 'Update event' : 'Create event'}
            isBusy={isSaving}
          />
        </article>

        <article className="panel">
          <h2>Your Events</h2>
          {events.length === 0 ? <p>No events yet.</p> : null}
          <div className="list-grid">
            {events.map((event) => (
              <div className="row-card" key={event._id}>
                <div>
                  <h3>{event.name}</h3>
                  <p>{event.shortDescription}</p>
                  <p className="subtle">{new Date(event.date).toLocaleString()}</p>
                </div>
                <div className="row-actions">
                  <button type="button" className="ghost-btn" onClick={() => handleEdit(event)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="ghost-btn danger-btn"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => setSelectedEventId(event._id)}
                  >
                    Manage Requests
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel">
        <h2>
          Participant Requests
          {selectedEvent ? `: ${selectedEvent.name}` : ''}
        </h2>
        {!selectedEventId ? <p>Select an event to manage participant requests.</p> : null}
        {selectedEventId && requests.length === 0 ? <p>No requests found.</p> : null}
        <div className="list-grid">
          {requests.map((request) => (
            <div key={request._id} className="row-card">
              <div>
                <h3>{request.user?.name || 'Unknown user'}</h3>
                <p>{request.user?.email || 'No email available'}</p>
                <p className="subtle">Current status: {request.status}</p>
              </div>
              <div className="row-actions">
                <button
                  type="button"
                  className="primary-btn"
                  onClick={() => handleDecision(request._id, 'approved')}
                  disabled={request.status === 'approved'}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="ghost-btn danger-btn"
                  onClick={() => handleDecision(request._id, 'rejected')}
                  disabled={request.status === 'rejected'}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  )
}

export default AdminDashboardPage

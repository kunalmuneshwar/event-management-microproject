import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppShell from '../../components/AppShell'
import {
  getEventById,
  getMyRegistrations,
  registerForEvent,
} from '../../services/eventService'

const UserEventDetailsPage = () => {
  const { eventId } = useParams()
  const [eventData, setEventData] = useState(null)
  const [myRegistration, setMyRegistration] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRegistering, setIsRegistering] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadDetails = useCallback(async () => {
    const [details, registrations] = await Promise.all([
      getEventById(eventId),
      getMyRegistrations(),
    ])

    setEventData(details)

    const current = registrations.find((item) => item.event?._id === eventId)
    setMyRegistration(current || null)
  }, [eventId])

  useEffect(() => {
    const boot = async () => {
      try {
        setError('')
        await loadDetails()
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load event details.')
      } finally {
        setIsLoading(false)
      }
    }

    boot()
  }, [loadDetails])

  const handleRegister = async () => {
    try {
      setError('')
      setMessage('')
      setIsRegistering(true)
      const data = await registerForEvent(eventId)
      setMessage(data.message)
      await loadDetails()
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to register for this event.')
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <AppShell role="user" title="Event Details">
      {error ? <p className="error-text">{error}</p> : null}
      {message ? <p className="success-text">{message}</p> : null}

      {isLoading ? <p>Loading details...</p> : null}

      {!isLoading && eventData?.event ? (
        <section className="panel">
          <h2>{eventData.event.name}</h2>
          <p>{eventData.event.shortDescription}</p>
          <p className="subtle">{new Date(eventData.event.date).toLocaleString()}</p>
          <p>
            Visibility: <strong>{eventData.event.visibility}</strong>
          </p>
          <div className="chip-wrap">
            {(eventData.event.tags || []).map((tag) => (
              <span key={`${eventData.event._id}-${tag}`} className="chip chip-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="stats-grid">
            <article className="stat-card">
              <h2>{eventData.registrationStats.approved}</h2>
              <p>Approved</p>
            </article>
            <article className="stat-card">
              <h2>{eventData.registrationStats.pending}</h2>
              <p>Pending</p>
            </article>
            <article className="stat-card">
              <h2>{eventData.registrationStats.rejected}</h2>
              <p>Rejected</p>
            </article>
          </div>

          {myRegistration ? (
            <p className="subtle">You already registered. Status: {myRegistration.status}</p>
          ) : (
            <button
              type="button"
              className="primary-btn"
              onClick={handleRegister}
              disabled={isRegistering}
            >
              {isRegistering ? 'Registering...' : 'Register for event'}
            </button>
          )}

          <Link to="/user/events" className="text-link">
            Back to events
          </Link>
        </section>
      ) : null}
    </AppShell>
  )
}

export default UserEventDetailsPage

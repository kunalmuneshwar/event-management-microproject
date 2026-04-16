import { useEffect, useMemo, useState } from 'react'
import AppShell from '../../components/AppShell'
import EventCard from '../../components/EventCard'
import { getAllEvents } from '../../services/eventService'

const UserEventsPage = () => {
  const [events, setEvents] = useState([])
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setError('')
        const data = await getAllEvents()
        setEvents(data)
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load events.')
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return events
    }

    return events.filter((event) => {
      const inName = event.name.toLowerCase().includes(q)
      const inDescription = event.shortDescription.toLowerCase().includes(q)
      const inTags = (event.tags || []).some((tag) => tag.toLowerCase().includes(q))

      return inName || inDescription || inTags
    })
  }, [events, query])

  return (
    <AppShell role="user" title="Browse Events">
      <section className="panel">
        <label className="field">
          <span>Search events</span>
          <input
            placeholder="Search by name, description, or tag"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </section>

      {error ? <p className="error-text">{error}</p> : null}
      {isLoading ? <p>Loading events...</p> : null}

      {!isLoading ? (
        <section className="card-grid">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
          {filteredEvents.length === 0 ? <p>No events matched your search.</p> : null}
        </section>
      ) : null}
    </AppShell>
  )
}

export default UserEventsPage

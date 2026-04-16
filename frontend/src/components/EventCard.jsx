import { Link } from 'react-router-dom'

const formatDate = (value) => {
  return new Date(value).toLocaleString()
}

const EventCard = ({ event }) => {
  return (
    <article className="event-card">
      <div className="event-header-row">
        <h3>{event.name}</h3>
        <span className={`chip ${event.visibility === 'private' ? 'chip-private' : 'chip-open'}`}>
          {event.visibility}
        </span>
      </div>
      <p>{event.shortDescription}</p>
      <p className="subtle">{formatDate(event.date)}</p>
      <div className="chip-wrap">
        {(event.tags || []).map((tag) => (
          <span key={`${event._id}-${tag}`} className="chip chip-tag">
            {tag}
          </span>
        ))}
      </div>
      <Link to={`/user/events/${event._id}`} className="text-link">
        View details
      </Link>
    </article>
  )
}

export default EventCard

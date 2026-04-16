import { useEffect, useState } from 'react'
import AppShell from '../../components/AppShell'
import { getUserDashboard } from '../../services/eventService'

const UserDashboardPage = () => {
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 })
  const [registrations, setRegistrations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setError('')
        const data = await getUserDashboard()
        setStats(data.stats)
        setRegistrations(data.registrations)
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load user dashboard.')
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  return (
    <AppShell role="user" title="User Dashboard">
      {error ? <p className="error-text">{error}</p> : null}
      {isLoading ? <p>Loading dashboard...</p> : null}

      {!isLoading ? (
        <>
          <section className="stats-grid">
            <article className="stat-card">
              <h2>{stats.approved}</h2>
              <p>Approved</p>
            </article>
            <article className="stat-card">
              <h2>{stats.pending}</h2>
              <p>Pending</p>
            </article>
            <article className="stat-card">
              <h2>{stats.rejected}</h2>
              <p>Rejected</p>
            </article>
          </section>

          <section className="panel">
            <h2>My Registrations</h2>
            {registrations.length === 0 ? <p>You have no registrations yet.</p> : null}
            <div className="list-grid">
              {registrations.map((item) => (
                <div key={item._id} className="row-card">
                  <div>
                    <h3>{item.event?.name || 'Unknown event'}</h3>
                    <p>{item.event?.shortDescription || 'No description available'}</p>
                  </div>
                  <div>
                    <p className="subtle">{new Date(item.event?.date).toLocaleString()}</p>
                    <span
                      className={`chip ${
                        item.status === 'approved'
                          ? 'chip-open'
                          : item.status === 'pending'
                            ? 'chip-tag'
                            : 'chip-private'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </AppShell>
  )
}

export default UserDashboardPage

import { Link } from 'react-router-dom'

const featureList = [
  {
    title: 'Smart Event Control',
    text: 'Create open and approval-based events with one streamlined admin flow.',
  },
  {
    title: 'Fast Registration',
    text: 'Users discover events, submit requests, and track status without friction.',
  },
  {
    title: 'Approval Pipeline',
    text: 'Review private requests quickly with clear pending, accepted, and rejected states.',
  },
  {
    title: 'Role Focused UX',
    text: 'Admin and user dashboards are optimized for the exact tasks each role needs.',
  },
]

const impactStats = [
  { value: '120+', label: 'Events Organized' },
  { value: '4.8/5', label: 'User Experience Score' },
  { value: '99.9%', label: 'Uptime Friendly Flows' },
]

const LandingPage = () => {
  return (
    <div className="public-shell landing-page">
      <header className="public-header landing-nav">
        <Link to="/" className="brand">
          EventSphere
        </Link>

        <nav className="public-nav" aria-label="Primary navigation">
          <Link to="/" className="top-link">
            Home
          </Link>
          <a href="#features" className="top-link">
            Features
          </a>
          <Link to="/login" className="top-link">
            Login Hub
          </Link>
          <Link to="/admin/login" className="top-link">
            Admin Login
          </Link>
          <Link to="/user/login" className="top-link">
            User Login
          </Link>
        </nav>
      </header>

      <main className="landing-main">
        <section className="showcase-hero">
          <div className="showcase-copy">
            <p className="eyebrow">MERN Event Management Platform</p>
            <h1>Design unforgettable events with less admin overhead.</h1>
            <p className="showcase-subtitle">
              EventSphere helps teams launch, manage, and scale modern event experiences
              from one beautifully organized workspace.
            </p>
            <div className="landing-actions">
              <Link to="/login" className="primary-btn">
                Explore Login Hub
              </Link>
              <Link to="/admin/signup" className="ghost-btn">
                Admin Signup
              </Link>
              <Link to="/user/signup" className="ghost-btn">
                User Signup
              </Link>
            </div>

            <div className="showcase-tags" aria-label="Highlights">
              <span>Public + Private Events</span>
              <span>Approval Workflow</span>
              <span>Live Registration</span>
            </div>
          </div>

          <aside className="showcase-panel" aria-label="Platform impact">
            <p className="panel-kicker">Platform Impact</p>
            <h2>Built for teams that move fast.</h2>
            <div className="impact-grid">
              {impactStats.map((stat) => (
                <article key={stat.label} className="impact-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
            <p className="subtle">
              Manage event setup, registration handling, and attendee visibility from one
              reliable center.
            </p>
          </aside>
        </section>

        <section id="features" className="showcase-features">
          <p className="eyebrow">Features</p>
          <h2>Everything you need to run polished, high-trust events.</h2>
          <div className="feature-grid">
            {featureList.map((feature) => (
              <article key={feature.title} className="feature-tile">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="showcase-cta">
          <h2>Ready to launch your next event?</h2>
          <p>
            Start as an admin to publish events, or join as a user to discover what is live.
          </p>
          <div className="landing-actions">
            <Link to="/admin/login" className="primary-btn">
              Continue as Admin
            </Link>
            <Link to="/user/login" className="ghost-btn">
              Continue as User
            </Link>
          </div>
        </section>
      </main>

      <footer className="showcase-footer">
        <p>© {new Date().getFullYear()} EventSphere. Crafted for seamless event journeys.</p>
        <div className="showcase-footer-links">
          <Link to="/login" className="text-link">
            Login Hub
          </Link>
          <Link to="/admin/signup" className="text-link">
            Admin Signup
          </Link>
          <Link to="/user/signup" className="text-link">
            User Signup
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

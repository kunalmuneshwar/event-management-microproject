import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="public-shell">
      <header className="public-header">
        <Link to="/" className="brand">
          EventSphere
        </Link>
        <nav className="public-nav">
          <Link to="/" className="top-link">
            Home
          </Link>
          <Link to="/login" className="top-link">
            Login
          </Link>
          <Link to="/admin/login" className="top-link">
            Admin Login
          </Link>
          <Link to="/user/login" className="top-link">
            User Login
          </Link>
        </nav>
      </header>

      <main className="landing-wrap">
        <section className="landing-card">
          <p className="eyebrow">MERN Event Management</p>
          <h1>Run open and approval-based events from one hub.</h1>
          <p>
            Admins create and manage events, while users discover events and register in
            seconds.
          </p>
          <div className="landing-actions">
            <Link to="/login" className="primary-btn">
              Go To Login Hub
            </Link>
            <Link to="/admin/signup" className="ghost-btn">
              Admin Signup
            </Link>
            <Link to="/user/signup" className="ghost-btn">
              User Signup
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage
